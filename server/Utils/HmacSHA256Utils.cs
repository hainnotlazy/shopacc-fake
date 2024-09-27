using System.Security.Cryptography;
using System.Text;

namespace server.Utils {
	public static class HmacSHA256Utils {
		public static string HashString(string source, string key, bool toLower = false) {
			byte[] keyBytes = Encoding.UTF8.GetBytes(key);
			byte[] sourceBytes = Encoding.UTF8.GetBytes(source);
			using var hmac = new HMACSHA256(keyBytes);
			byte[] bytes = hmac.ComputeHash(sourceBytes);
			return toLower ? Convert.ToHexString(bytes).ToLower() : Convert.ToHexString(bytes);
		}
	}
}
