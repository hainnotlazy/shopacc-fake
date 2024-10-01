using System.ComponentModel;
using Newtonsoft.Json;
using server.Enums;

namespace server.Dtos.Payment.Momo {
	public class OneTimePaymentRequest {
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
		public string Signature { get; set; } = string.Empty;
  }
}
