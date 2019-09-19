using System.Collections.Generic;
using System.Text;

namespace RabbitMqPoc.ConfigModels
{
    public class HttpClientConfig
    {
        public string ApiName { get; set; }
        public string BaseAddress { get; set; }
        public Dictionary<string, string> HeaderDefinitions { get; set; }
        public string BaseRef { get; set; }

        public override string ToString()
        {
            var settings = new StringBuilder();
            settings.AppendLine($"ApiName length: {ApiName?.Length ?? 0}");
            settings.AppendLine($"ApiName: {ApiName}");
            settings.AppendLine($"BaseAddress: {BaseAddress}");
            settings.AppendLine($"BaseRef: {BaseRef}");
            settings.AppendLine($"HeaderDefinitions length: {HeaderDefinitions?.Count ?? 0}");

            return settings.ToString();
        }
    }

}
