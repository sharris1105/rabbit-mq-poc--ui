using System.Text;

namespace RabbitMqPoc.Authorization
{
    public class AppAuthTokenModel
    {
        public string Token { get; set; }
        public int ResponseStatusCode { get; set; }
        public string ResponseMessage { get; set; }
        public string Payload { get; set; }

        public override string ToString()
        {
            var settings = new StringBuilder();
            settings.AppendLine($"Token: {Token}");
            settings.AppendLine($"ResponseStatusCode: {ResponseStatusCode}");
            settings.AppendLine($"ResponseMessage: {ResponseMessage}");
            settings.AppendLine($"Payload: {Payload}");
            return settings.ToString();
        }
    }
}