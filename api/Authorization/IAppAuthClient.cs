using System.Threading.Tasks;

namespace RabbitMqPoc.Authorization
{
    public interface IAppAuthClient
    {
        Task<AppAuthTokenModel> GetSession(string encryptedAppCredentials, string sessionId);
        Task<AppAuthTokenModel> ValidateAndIssueToken(string encryptedAppCredentials, string inboundToken);
    }
}
