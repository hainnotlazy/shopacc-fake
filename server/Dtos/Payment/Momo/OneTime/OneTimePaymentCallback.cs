namespace server.Dtos.Payment.Momo {
	public class OneTimePaymentCallback {
		public required string PartnerCode { get; set; }
		public required string OrderId { get; set; }
		public required string RequestId { get; set; }
		public required long Amount { get; set; }
		public string? StoreId { get; set; }
		public required string OrderInfo { get; set; }
		public string? PartnerUserId { get; set; }
		public required string OrderType { get; set; } = "momo_wallet";
		public required long TransId { get; set; }
		public required int ResultCode { get; set; }
		public required string Message { get; set; }
		public required string PayType { get; set; }
		public required long ResponseTime { get; set; }
		public required string Timestamp { get; set; }
		public required string ExtraData { get; set; }
		public required string Signature { get; set; }

		public string? PaymentOption { get; set; }
		public long UserFee { get; set; }
		public List<PromotionInfo>? PromotionInfo { get; set; }
  }
}
