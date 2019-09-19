using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace RabbitMqPoc.Helper
{
    public class ApiServiceHelper
    {
        public async Task<IActionResult> ConstructActionResult<T>(Task<HttpResponseMessage> httpMessageTask, [CallerMemberName] string errorSource = "")
        {
            try
            {
                using (var httpMessage = await httpMessageTask.ConfigureAwait(false))
                {
                    var responseContent = await httpMessage.Content.ReadAsStringAsync().ConfigureAwait(false);
                    try
                    {
                        httpMessage.EnsureSuccessStatusCode();
                        var responseValue = JsonConvert.DeserializeObject<T>(responseContent);
                        return new OkObjectResult(responseValue);
                    }
                    catch (HttpRequestException e)
                    {
                        e.ToString();
                        var responseValue = JsonConvert.DeserializeObject<ValidationProblemDetails>(responseContent);
                        return new ObjectResult(responseValue)
                        {
                            StatusCode = (int) httpMessage.StatusCode
                        };
                    }
                }
            }
            catch (Exception e)
            {
                e.ToString();
                return new ObjectResult($"{(int)HttpStatusCode.NotFound}: Not Found - {errorSource}")
                {
                    StatusCode = (int)HttpStatusCode.NotFound
                };
            }

        }

        public AuthenticationHeaderValue GenerateAuthHeader(string token)
        {
            var tokenArray = token.Split(' ');
            return new AuthenticationHeaderValue(tokenArray[0], tokenArray[1]);
        }
    }
}
