using System.Net;
using server.DesignPatterns.Factories.Abstract;
using server.Dtos.Payment;

namespace server.DesignPatterns.Factories {
  public class VnPayAllInOnePaymentFactory : IPaymentFactory
  {
		private readonly string API_ENDPOINT_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

		public IPayment CreatePayment()
		{
			throw new NotImplementedException();
		}
		public string CreateSignature(string secretKey)
		{
			// SortedDictionary<string, string> sortedDictionary = [];

			// sortedDictionary["vnp_Version"] = Version;
			// sortedDictionary["vnp_TmnCode"] = TmnCode;
			// sortedDictionary["vnp_Amount"] = Amount.ToString();
			// sortedDictionary["vnp_Command"] = Command;
			// sortedDictionary["vnp_CreateDate"] = CreateDate.ToString();
			// sortedDictionary["vnp_CurrCode"] = CurrCode;
			// sortedDictionary["vnp_IpAddr"] = IpAddr;
			// sortedDictionary["vnp_Locale"] = Locale;
			// sortedDictionary["vnp_OrderInfo"] = OrderInfo;
			// sortedDictionary["vnp_OrderType"] = OrderType;
			// sortedDictionary["vnp_ReturnUrl"] = ReturnUrl;
			// sortedDictionary["vnp_TxnRef"] = TxnRef;
			// sortedDictionary["vnp_ExpireDate"] = ExpireDate.ToString();

			// if(!BankCode.IsNullOrEmpty()) {
			// 	sortedDictionary["vnp_BankCode"] = BankCode!;
			// }

			// string delimiter = "&";
			// IEnumerable<string> parameters = sortedDictionary.Select((kvp) => FormatKeyValueToUrlEncoding(kvp.Key, kvp.Value));
			// string queryString = string.Join(delimiter, parameters);

			// _SecureHash = HmacSHA256Utils.HashString(queryString, secretKey);
			return string.Empty;
		}

		private static string FormatKeyValueToUrlEncoding(string key, string value) {
			return WebUtility.UrlEncode(key) + WebUtility.UrlEncode(value);
		}
  }
}
