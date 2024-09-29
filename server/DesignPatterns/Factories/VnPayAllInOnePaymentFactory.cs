using server.DesignPatterns.Factories.Abstract;
using server.Dtos.Payment;

namespace server.DesignPatterns.Factories {
  public class VnPayAllInOnePaymentFactory : IPaymentFactory
  {
		private readonly string API_ENDPOINT_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

		public Task<InitPaymentResponse> CreatePaymentAsync(string orderId, string orderDescription, long amount)
		{
			throw new NotImplementedException();
		}
  }
}
