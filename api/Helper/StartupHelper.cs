using System.Collections.Generic;
using RabbitMqPoc.Authorization;
using Microsoft.Extensions.Configuration;

namespace RabbitMqPoc.Helper
{
    public class StartUpHelper
    {
        public static AuthClientConfig GetEnvVariablesForAppAuthApi(IConfiguration config)
        {
            var conf = new AuthClientConfig
            {
                ApiName = EnvironmentConstants.AppAuthApiName,
                BaseAddress = GetSingleEnvVariable(EnvironmentConstants.AppAuthApiBaseAddress, config),
                HeaderDefinitions = new Dictionary<string, string>() {
                    {"Accept", "application/json"}
                },
                BaseRef = GetSingleEnvVariable(EnvironmentConstants.PathBase, config),
                AppName = "RabbitMqPoc",
                AppSecret = GetSingleEnvVariable(EnvironmentConstants.AppSecret, config)
            };
            return conf;
        }


        public static EncryptionSettingsModel GetEncryptionSettings(IConfiguration config)
        {
            var encryptionSettings = new EncryptionSettingsModel
            {
                PrivateKeyFileName = GetSingleEnvVariable(EnvironmentConstants.EncryptionPrivateKeyFileName, config),
                PrivateKeyFilePath = GetSingleEnvVariable(EnvironmentConstants.EncryptionPrivateKeyFilePath, config),
                PublicKeyFileName = GetSingleEnvVariable(EnvironmentConstants.EncryptionPublicKeyFileName, config),
                PublicKeyFilePath = GetSingleEnvVariable(EnvironmentConstants.EncryptionPublicKeyFilePath, config)
            };

            return encryptionSettings;
        }

        public static JwtSettingsModel GetTokenSettings(IConfiguration config)
        {
            int expMin = 60;
            int.TryParse(GetSingleEnvVariable(JwtConstants.JwtExpirationMinutesKey, config), out expMin)
;

            return new JwtSettingsModel()
            {
                PublicKeyFileName = GetSingleEnvVariable(JwtConstants.SigningPublicKeyFileName, config),
                PublicKeyFilePath = GetSingleEnvVariable(JwtConstants.SigningPublicKeyFilePath, config),
                Issuer = GetSingleEnvVariable(JwtConstants.JwtIssuerKey, config),
                Audience = GetSingleEnvVariable(JwtConstants.JwtAudienceKey, config),
                JwtAppNameClaim = GetSingleEnvVariable(JwtConstants.JwtAppNameClaimKey, config),
                JwtPermissionsClaim = GetSingleEnvVariable(JwtConstants.JwtPermissionsClaimKey, config),
                ExpirationInMinutes = expMin
            };

        }

        private static string GetSingleEnvVariable(string whichVar, IConfiguration config)
        {
            return !string.IsNullOrWhiteSpace(config.GetSection(whichVar).Value) ? config.GetSection(whichVar).Value : string.Empty;
        }
    }
}
