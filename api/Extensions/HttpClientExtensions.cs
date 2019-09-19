using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace RabbitMqPoc.Extensions
{
    public static class HttpClientExtensions
    {
        public static Task<HttpResponseMessage> PostAsync<T>(this HttpClient client, string requestUri, T contentObject)
        {
            var content = new StringContent(JsonConvert.SerializeObject(contentObject), null, client.DefaultRequestHeaders.Accept.ToString());
            return client.PostAsync(requestUri, content);
        }
    }
}