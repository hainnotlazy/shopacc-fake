namespace server.Dtos.Payment.Momo {
	public class PromotionInfo {
		public required long Amount { get; set; }
		public required long AmountSponsor { get; set; }
		public required string VoucherId { get; set; }
		public required string VoucherType { get; set; }
		public required string VoucherName { get; set; }
		public required string MerchantRate { get; set; }
	}
}
