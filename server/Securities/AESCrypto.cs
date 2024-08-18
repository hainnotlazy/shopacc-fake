using System.Security.Cryptography;
using System.Text;

namespace server.Securities;

public class AESCrypto
{
	public Aes Key { get; }
	public const int FixedVectorSize = 16;
	public const int FixedBlockSize = 16;

	private AESCrypto(Aes key) {
		Key = key;
	}

	public static AESCrypto GetInstance(string secretKey) {
		using Aes aes = Aes.Create();

		int keyLength = Convert.FromBase64String(secretKey).Length;
		byte[] keyArr = Encoding.UTF8.GetBytes(secretKey);
		byte[] KeyArrBytesValue = new byte[keyLength];

		Array.Copy(keyArr, KeyArrBytesValue, keyLength);

		aes.Key = KeyArrBytesValue;

		return new AESCrypto(aes);
	}

	public static AESCrypto GetInstance(string secretKey, string iv) {
		using Aes aes = Aes.Create();

		int keyLength = Convert.FromBase64String(secretKey).Length;
		byte[] keyArr = Encoding.UTF8.GetBytes(secretKey);
		byte[] KeyArrBytesValue = new byte[keyLength];

		Array.Copy(keyArr, KeyArrBytesValue, keyLength);

		byte[] ivArr = Encoding.UTF8.GetBytes(iv);
		byte[] ivArr16BytesValue = new byte[FixedVectorSize];

		Array.Copy(ivArr, ivArr16BytesValue, ivArr.Length);

		aes.Key = KeyArrBytesValue;
		aes.IV = ivArr16BytesValue;

		return new AESCrypto(aes);
	}

	public static AESCrypto GetInstance(AESSupportedSize keySize = AESSupportedSize.AES_128) {
		using Aes aes = Aes.Create();

		aes.KeySize = (int) keySize;

		aes.GenerateKey();

		return new AESCrypto(aes);
	}

	public static AESCrypto GetInstance(string iv, AESSupportedSize keySize = AESSupportedSize.AES_128) {
		using Aes aes = Aes.Create();

		byte[] ivArr = Encoding.UTF8.GetBytes(iv);
		byte[] ivArr16BytesValue = new byte[FixedVectorSize];

		Array.Copy(ivArr, ivArr16BytesValue, ivArr.Length);

		aes.KeySize = (int) keySize;
		aes.IV = ivArr16BytesValue;

		aes.GenerateKey();

		return new AESCrypto(aes);
	}

	public string Encrypt(string plainText, CipherMode cipherMode = CipherMode.CBC, PaddingMode paddingMode = PaddingMode.PKCS7) {
		Key.Mode = cipherMode;
		Key.Padding = paddingMode;

		ICryptoTransform encryptor = Key.CreateEncryptor();

		byte[] plainTextByte = Encoding.UTF8.GetBytes(plainText);
		byte[] CipherText = encryptor.TransformFinalBlock(plainTextByte, 0, plainTextByte.Length);

		return Convert.ToBase64String(CipherText);
	}
}
