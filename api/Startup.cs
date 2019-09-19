using System.IO;
using System.Security.Cryptography;
using RabbitMqPoc.Authorization;
using RabbitMqPoc.Extensions;
using RabbitMqPoc.Helper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace RabbitMqPoc
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .AddApplicationPart(typeof(Startup).Assembly)
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddCors(options =>
            {
                options.AddPolicy("DevCorsPolicy",
                    builder => builder
                        .WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .AllowAnyHeader()
                        .Build()
                );
            });

            var appAuthConfig = StartUpHelper.GetEnvVariablesForAppAuthApi(Configuration);
            services.AddSingleton(appAuthConfig);

            var encryptionSettings = StartUpHelper.GetEncryptionSettings(Configuration);
            services.AddSingleton(encryptionSettings);

            var tokenSettings = StartUpHelper.GetTokenSettings(Configuration);
            services.AddSingleton(tokenSettings);

            ConfigureAuth(services, tokenSettings);


            services.AddSingleton<IAppAuthClient, AppAuthClient>();
            services.AddScoped<IAppAuthApiService, AppAuthApiService>();
            services.AddScoped<ApiServiceHelper>();
        }

        private void ConfigureAuth(IServiceCollection services, JwtSettingsModel claimsModel)
        {
            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser().Build());
            });

            RSA publicRsa = RSA.Create();
            var publicKey = Path.Combine(claimsModel.PublicKeyFilePath, claimsModel.PublicKeyFileName);
            publicRsa.LoadPublicKey(publicKey);
            var signingKey = new RsaSecurityKey(publicRsa);

            services
                .AddAuthentication(cfg =>
                {
                    cfg.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    cfg.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingKey
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("DevCorsPolicy");
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
