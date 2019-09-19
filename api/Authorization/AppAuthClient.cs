using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
 using Newtonsoft.Json;

namespace RabbitMqPoc.Authorization
{
    public class AppAuthClient : IAppAuthClient
    {
        private readonly HttpClient _client;
        private ILogger<Startup> _logger;

        private static readonly string ValidateTokenApiRoute = "Token/validateandissue";
        private static readonly string GetSessionRoute = "Token/session";

        public AppAuthClient(AuthClientConfig appAuthConfig, ILogger<Startup> logger)
        {
            _client = new HttpClient();
            _logger = logger;
            _logger.LogInformation($"App Auth API Config Values:{Environment.NewLine}{appAuthConfig.ToString()}");
            _client.BaseAddress = new Uri(appAuthConfig.BaseAddress);

            if (appAuthConfig.HeaderDefinitions != null)
            {
                foreach (KeyValuePair<string, string> h in appAuthConfig.HeaderDefinitions)
                {
                    _client.DefaultRequestHeaders.Add(h.Key, h.Value);
                }
            }

            _client.DefaultRequestHeaders.TransferEncodingChunked = false;
            //Default to application/json if no header type is specified
            if (_client.DefaultRequestHeaders.Accept.Count == 0)
            {
                _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            }
        }
        public async Task<AppAuthTokenModel> GetSession(string encryptedAppCredentials, string sessionId)
        {
            var routeWithQueryString = $"{GetSessionRoute}?sessionId={sessionId}";

            var request = new HttpRequestMessage(HttpMethod.Get, routeWithQueryString);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Headers.Add("encryptedCredentials", encryptedAppCredentials);

            using (var response = await _client.SendAsync(request))
            {
                var statusCode = (int)response.StatusCode;
                if (!response.IsSuccessStatusCode)
                {
                    var ex = new HttpRequestException(string.Format("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase));
                    _logger.LogError(ex, "Error on AppAuthApiService->GetSession");

                    return new AppAuthTokenModel
                    {
                        ResponseStatusCode = statusCode,
                        ResponseMessage = response.ReasonPhrase
                    };
                }

                var result = await response.Content.ReadAsStringAsync();
                var responseResult = JsonConvert.DeserializeObject<AppAuthTokenModel>(result);
                responseResult.ResponseStatusCode = statusCode;
                return responseResult;
            }
        }

        public async Task<AppAuthTokenModel> ValidateAndIssueToken(string encryptedAppCredentials, string inboundToken)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, ValidateTokenApiRoute);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Headers.Add("encryptedCredentials", encryptedAppCredentials);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", inboundToken);

            using (var response = await _client.SendAsync(request))
            {
                var statusCode = (int)response.StatusCode;
                if (!response.IsSuccessStatusCode)
                {
                    var ex = new HttpRequestException(string.Format("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase));
                    _logger.LogError(ex, "Error on AppAuthApiService->ValidateToken");

                    return new AppAuthTokenModel
                    {
                        ResponseStatusCode = statusCode,
                        ResponseMessage = response.ReasonPhrase
                    };
                }

                var result = await response.Content.ReadAsStringAsync();
                var responseResult = new AppAuthTokenModel()
                {
                    Token = JsonConvert.DeserializeObject<string>(result),
                    ResponseStatusCode = statusCode
                };

                if (string.IsNullOrEmpty(responseResult.Token))
                {
                    return new AppAuthTokenModel
                    {
                        ResponseStatusCode = 401,
                        ResponseMessage = "Unauthorized",
                    };
                }

                return responseResult;
            }
        }
    }
}
