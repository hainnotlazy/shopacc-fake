namespace server.Dtos.Payment {
	public class InitPaymentResponse {
		public required string Message { get; set; }
		public required string OrderId { get; set; }
		public string? TransactionId { get; set; }
		public string? PayUrl { get; set; }
		public string? QrCodeUrl { get; set; }
	}
}
