using server.Dtos.Payment;

namespace server.DesignPatterns.Factories.Abstract {
	public interface IPaymentFactory {
		IPayment CreatePayment();
	}
}
