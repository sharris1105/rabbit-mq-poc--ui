namespace RabbitMqPoc.Authorization
{
    public interface IEncryptionService
    {
        string Decrypt(byte[] encryptedString);

        byte[] Encrypt(string valueToEncrypt);
    }
}