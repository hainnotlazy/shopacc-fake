namespace server.Dtos.Payment.Momo {
	public class OneTimePaymentResponse {
		public required string PartnerCode { get; set; }
		public required string RequestId { get; set; }
		public required string OrderId { get; set; }
		public required long Amount { get; set; }
		public required long ResponseTime { get; set; }
		public required string Message { get; set; }
		public required int ResultCode { get; set; }
		public required string PayUrl { get; set; }
		public string? DeepLink { get; set; }
		public string? QrCodeUrl { get; set; }
		public string? DeeplinkMiniApp { get; set; }
		public string? Signature { get; set; }
		public long UserFee { get; set; }
	}
}
