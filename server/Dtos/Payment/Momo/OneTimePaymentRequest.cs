using System.ComponentModel;
using Newtonsoft.Json;
using server.Enums;
using server.Utils;

namespace server.Dtos.Payment.Momo {
	public class OneTimePaymentRequest: IHasSignature {
		[JsonProperty(PropertyName = "partnerCode")]
		public required string PartnerCode { get; set; }
		[JsonProperty(PropertyName = "subPartnerCode")]
		public string? SubPartnerCode { get; set; }
		[JsonProperty(PropertyName = "storeName")]
		public string? StoreName { get; set; }
		[JsonProperty(PropertyName = "storeId")]
		public string? StoreId { get; set; }
		[JsonProperty(PropertyName = "requestId")]
		public required string RequestId { get; set; }
		[JsonProperty(PropertyName = "amount")]
		public required long Amount { get; set; }
		[JsonProperty(PropertyName = "orderId")]
		public required string OrderId { get; set; }
		[JsonProperty(PropertyName = "orderInfo")]
		public required string OrderInfo { get; set; }
		[JsonProperty(PropertyName = "orderGroupId")]
		[DefaultValue(0)]
		public long OrderGroupId { get; set; }
		[JsonProperty(PropertyName = "redirectUrl")]
		public required string RedirectUrl { get; set; } = "";
		[JsonProperty(PropertyName = "ipnUrl")]
		public required string IpnUrl { get; set; } = "";
		[JsonProperty(PropertyName = "requestType")]
		public required string RequestType { get; set; } = "captureWallet";
		[JsonProperty(PropertyName = "extraData")]
		public required string ExtraData { get; set; }
		[JsonProperty(PropertyName = "items")]
		public List<Item>? Items { get; set; }
		[JsonProperty(PropertyName = "deliveryInfo")]
		public DeliveryInfo? DeliveryInfo { get; set; }
		[JsonProperty(PropertyName = "userInfo")]
		public UserInfo? UserInfo { get; set; }
		[JsonProperty(PropertyName = "referenceId")]
		public string? ReferenceId { get; set; }
		[JsonProperty(PropertyName = "autoCapture")]
		public bool AutoCapture { get; set; }
		[JsonProperty(PropertyName = "lang")]
		public string Lang { get; set; } = Language.VI.ToString().ToLower();
		[JsonProperty(PropertyName = "signature")]
		public string Signature { get => _Signature; }
		private string _Signature = string.Empty;

		/// <summary>
		/// This method will create signature to confirm information of this request. To see how signature is created, read this document:
		/// <para><a>https://developers.momo.vn/v3/docs/payment/api/wallet/onetime/#initiate-payment-method</a></para>
		/// <para>If method isn't called, an empty string will be set</para>
		/// </summary>
		public void CreateSignature(string secretKey, string accessKey)
		{
			string rawSignature = $"accessKey={accessKey}&amount={Amount}&extraData={ExtraData}&ipnUrl={IpnUrl}&orderId={OrderId}&orderInfo={OrderInfo}&partnerCode={PartnerCode}&redirectUrl={RedirectUrl}&requestId={RequestId}&requestType={RequestType}";
			_Signature = HmacSHA256Utils.HashString(rawSignature, secretKey, true);
		}

		public bool VerifySignature(string signature, string secretKey, string accessKey)
		{
			throw new NotImplementedException();
		}
  }
}
