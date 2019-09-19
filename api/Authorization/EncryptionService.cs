using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;

namespace RabbitMqPoc.Authorization
{
    public class EncryptionService : IEncryptionService
    {
        private readonly EncryptionSettingsModel _encryptionSettingsModel;

        public EncryptionService(EncryptionSettingsModel encryptionSettingsModel)
        {
            _encryptionSettingsModel = encryptionSettingsModel;
        }

        public byte[] Encrypt(string valueToEncrypt)
        {
            byte[] encryptedValue = new byte[0];

            try
            {
                RSA publicRsa = PublicKeyFromPemFile(Path.Combine(_encryptionSettingsModel.PublicKeyFilePath,
                                                                  _encryptionSettingsModel.PublicKeyFileName));

                encryptedValue = publicRsa.Encrypt(Encoding.Unicode.GetBytes(valueToEncrypt), RSAEncryptionPadding.Pkcs1);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return encryptedValue;
        }

        public string Decrypt(byte[] encryptedString)
        {
            var filePath = Path.Combine(_encryptionSettingsModel.PrivateKeyFilePath, _encryptionSettingsModel.PrivateKeyFileName);

            using (TextReader privateKeyTextReader = new StringReader(File.ReadAllText(filePath)))
            {
                AsymmetricCipherKeyPair keyPair = (AsymmetricCipherKeyPair)new PemReader(privateKeyTextReader).ReadObject();

                var rsaParams = ToRSAParameters((RsaPrivateCrtKeyParameters)keyPair.Private);

                var csp = new CspParameters
                {
                    KeyContainerName = $"BouncyCastle-{Guid.NewGuid()}"
                };

                var cryptoServiceProvider = new RSACryptoServiceProvider(csp);
                cryptoServiceProvider.ImportParameters(rsaParams);

                var decryptedBytesForAppName = cryptoServiceProvider.Decrypt(encryptedString, RSAEncryptionPadding.Pkcs1);
                var decryptedString = Encoding.Unicode.GetString(decryptedBytesForAppName);

                return decryptedString;
            }
        }

        private RSACryptoServiceProvider PublicKeyFromPemFile(string filePath)
        {
            using (TextReader publicKeyTextReader = new StringReader(File.ReadAllText(filePath)))
            {
                RsaKeyParameters publicKeyParam = (RsaKeyParameters)new PemReader(publicKeyTextReader).ReadObject();
                RSACryptoServiceProvider cryptoServiceProvider = new RSACryptoServiceProvider();
                RSAParameters parameters = new RSAParameters
                {
                    Modulus = publicKeyParam.Modulus.ToByteArrayUnsigned(),
                    Exponent = publicKeyParam.Exponent.ToByteArrayUnsigned()
                };

                cryptoServiceProvider.ImportParameters(parameters);

                return cryptoServiceProvider;
            }
        }

        private static byte[] ConvertRSAParametersField(byte[] bs, int size)
        {
            if (bs.Length == size)
                return bs;
            if (bs.Length > size)
                throw new ArgumentException("Specified size too small", "size");
            byte[] padded = new byte[size];
            Array.Copy(bs, 0, padded, size - bs.Length, bs.Length);
            return padded;
        }

        private RSAParameters ToRSAParameters(RsaPrivateCrtKeyParameters privateKey)
        {
            RSAParameters rp = new RSAParameters
            {
                Modulus = privateKey.Modulus.ToByteArrayUnsigned(),
                Exponent = privateKey.PublicExponent.ToByteArrayUnsigned(),
                P = privateKey.P.ToByteArrayUnsigned(),
                Q = privateKey.Q.ToByteArrayUnsigned()
            };
            rp.D = ConvertRSAParametersField(privateKey.Exponent.ToByteArrayUnsigned(), rp.Modulus.Length);
            rp.DP = ConvertRSAParametersField(privateKey.DP.ToByteArrayUnsigned(), rp.P.Length);
            rp.DQ = ConvertRSAParametersField(privateKey.DQ.ToByteArrayUnsigned(), rp.Q.Length);
            rp.InverseQ = ConvertRSAParametersField(privateKey.QInv.ToByteArrayUnsigned(), rp.Q.Length);
            return rp;
        }

    }
}
