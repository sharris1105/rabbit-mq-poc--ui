namespace RabbitMqPoc.Authorization
{
    public class JwtConstants
    {
        public const string SigningPublicKeyFileName = "SigningPublicKeyFileName";
        public const string SigningPublicKeyFilePath = "SigningPublicKeyFilePath";
        public const string JwtIssuerKey = "JwtIssuer";
        public const string JwtAudienceKey = "JwtAudience";
        public const string JwtExpirationMinutesKey = "JwtExpirationMinutes";
        public const string JwtAppNameClaimKey = "ApplicationName";
        public const string JwtPermissionsClaimKey = "ApplicationPermissions";

    }
}
