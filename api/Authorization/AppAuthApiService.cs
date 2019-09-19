using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace RabbitMqPoc.Authorization
{
    public class AppAuthApiService : IAppAuthApiService
    {
        private readonly IEncryptionService _encryptionService;
        private IAppAuthClient _client;
        private ILogger<AppAuthApiService> _logger;
        private AuthClientConfig _authConfig;

        public AppAuthApiService(AuthClientConfig authConfig, IAppAuthClient client, EncryptionSettingsModel encryptionSettings, ILogger<AppAuthApiService> logger)
        {
            _logger = logger;
            _encryptionService = new EncryptionService(encryptionSettings);
            _client = client;
            _authConfig = authConfig;
        }

        public async Task<AppAuthTokenModel> GetSession(string sessionId)
        {
            sessionId = sessionId.Replace("\"", "");
            try
            {
                var appCredentials = new AppCredentialsModel
                {
                    Name = _authConfig.AppName,
                    Secret = _authConfig.AppSecret
                };
                var encryptedAppCredentials = EncryptPayload(appCredentials);

                // get initial session.
                var responseResult = await _client.GetSession(encryptedAppCredentials, sessionId);
                if (responseResult.ResponseStatusCode != (int)HttpStatusCode.OK)
                {
                    return responseResult;
                }

                // Get dashboard token.
                var newTokenModel = await ValidateAndIssueToken(responseResult.Token);
                if (newTokenModel.ResponseStatusCode != (int)HttpStatusCode.OK)
                {
                    return newTokenModel;
                }
                responseResult.Token = newTokenModel.Token;

                await ConvertLegacyData(responseResult);

                return responseResult;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error on AppAuthApiService->GetSession");
                return new AppAuthTokenModel
                {
                    ResponseStatusCode = 500,
                    ResponseMessage = "Internal Server Error",
                };
            }
        }

        private async Task ConvertLegacyData(AppAuthTokenModel responseResult)
        {
            return; // TODO: Many apps may have data that has an id that is different from what might have been passed in by the host.
                    // This is where you would convert that data to something that this app can use.
        }

        public async Task<AppAuthTokenModel> ValidateAndIssueToken(string inboundToken)
        {
            var statusCode = 0;
            var responseResult = new AppAuthTokenModel();
            try
            {
                var appCredentials = new AppCredentialsModel
                {
                    Name = _authConfig.AppName,
                    Secret = _authConfig.AppSecret
                };

                var encryptedAppCredentials = EncryptPayload(appCredentials);
                var response = await _client.ValidateAndIssueToken(encryptedAppCredentials, inboundToken);
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error on AppAuthApiService->ValidateToken");
                // this can occur if the jwt token has expired
                return new AppAuthTokenModel
                {
                    ResponseStatusCode = statusCode,
                    ResponseMessage = responseResult.ResponseMessage
                };
            }
        }

        private string EncryptPayload(AppCredentialsModel decryptedAppCredentials)
        {
            var jsonSerializedObject = JsonConvert.SerializeObject(decryptedAppCredentials);
            var encryptedPayload = _encryptionService.Encrypt(jsonSerializedObject);

            return Convert.ToBase64String(encryptedPayload);
        }
    }
}