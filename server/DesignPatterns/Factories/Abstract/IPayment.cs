namespace server.Dtos.Payment {
	public interface IPayment {
		Task<InitPaymentResponse> CreateAsync(string orderId, string orderDescription, long amount);
	}
}
