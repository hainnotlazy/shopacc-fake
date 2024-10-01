namespace server.Dtos.Payment.VnPay {
	public class AllinOnePaymentRequest {
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
		public string SecureHash { get; set; } = string.Empty;
  }
}
