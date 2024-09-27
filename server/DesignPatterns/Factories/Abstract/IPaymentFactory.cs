using server.Dtos.Payment;

namespace server.DesignPatterns.Factories.Abstract {
	public interface IPaymentFactory {
		Task<InitPaymentResponse> CreatePaymentAsync(string orderId, string orderDescription, int amount);
	}
}
