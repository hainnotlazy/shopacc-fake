using System.Net;
using Microsoft.IdentityModel.Tokens;
using server.Utils;

namespace server.Dtos.Payment.VnPay {
	public class AllinOnePaymentRequest: IHasSignature {
		public required string Version { get; set; }
		public string Command { get; set; } = "pay";
		public required string TmnCode { get; set; }
		public required long Amount { get; set; }
		public string? BankCode { get; set; }
		public required long CreateDate { get; set; }
		public required string CurrCode { get; set; }
		public required string IpAddr { get; set; }
		public required string Locale { get; set; }
		public required string OrderInfo { get; set; }
		public required string OrderType { get; set; }
		public required string ReturnUrl { get; set; }
		public required long ExpireDate { get; set; }
		public required string TxnRef { get; set; }
		public string SecureHash { get => _SecureHash; }
		private string _SecureHash = string.Empty;

		public void CreateSignature(string secretKey, string accessKey)
		{
			SortedDictionary<string, string> sortedDictionary = [];

			sortedDictionary["vnp_Version"] = Version;
			sortedDictionary["vnp_TmnCode"] = TmnCode;
			sortedDictionary["vnp_Amount"] = Amount.ToString();
			sortedDictionary["vnp_Command"] = Command;
			sortedDictionary["vnp_CreateDate"] = CreateDate.ToString();
			sortedDictionary["vnp_CurrCode"] = CurrCode;
			sortedDictionary["vnp_IpAddr"] = IpAddr;
			sortedDictionary["vnp_Locale"] = Locale;
			sortedDictionary["vnp_OrderInfo"] = OrderInfo;
			sortedDictionary["vnp_OrderType"] = OrderType;
			sortedDictionary["vnp_ReturnUrl"] = ReturnUrl;
			sortedDictionary["vnp_TxnRef"] = TxnRef;
			sortedDictionary["vnp_ExpireDate"] = ExpireDate.ToString();

			if(!BankCode.IsNullOrEmpty()) {
				sortedDictionary["vnp_BankCode"] = BankCode!;
			}

			string delimiter = "&";
			IEnumerable<string> parameters = sortedDictionary.Select((kvp) => FormatKeyValueToUrlEncoding(kvp.Key, kvp.Value));
			string queryString = string.Join(delimiter, parameters);

			_SecureHash = HmacSHA256Utils.HashString(queryString, secretKey);
		}

		private static string FormatKeyValueToUrlEncoding(string key, string value) {
			return WebUtility.UrlEncode(key) + WebUtility.UrlEncode(value);
		}

		public bool VerifySignature(string signature, string secretKey, string accessKey)
		{
			throw new NotImplementedException();
		}
  }
}
