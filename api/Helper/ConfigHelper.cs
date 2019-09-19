using System.IO;
using Microsoft.Extensions.Configuration;

namespace RabbitMqPoc.Helper
{
    public static class ConfigHelper
    {

        public static IConfigurationRoot ConfigureFromAppSettings()
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("launchSettings.json", true, true)
                .AddJsonFile("launch.json", true, true)
                .Build();

            return config;
        }
    }
}
