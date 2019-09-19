using System.Text;

namespace RabbitMqPoc.Authorization
{
    public class EncryptionSettingsModel
    {
        public string PublicKeyFilePath { get; set; }
        public string PublicKeyFileName { get; set; }
        public string PrivateKeyFilePath { get; set; }
        public string PrivateKeyFileName { get; set; }

        public override string ToString()
        {
            var settings = new StringBuilder();
            settings.AppendLine($"PublicKeyFilePath: {PublicKeyFilePath}");
            settings.AppendLine($"PublicKeyFileName: {PublicKeyFileName}");
            settings.AppendLine($"PrivateKeyFilePath: {PrivateKeyFilePath}");
            settings.AppendLine($"PrivateKeyFileName: {PrivateKeyFileName}");
            return settings.ToString();
        }
    }
}