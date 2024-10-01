using server.DesignPatterns.Factories.Abstract;
using server.Dtos.Payment;

namespace server.DesignPatterns.Factories {
  public class MomoOneTimePaymentFactory(string accessKey, string secretKey, string partnerCode, string? storeId = null, string? storeName = null): IPaymentFactory
  {
		public IPayment CreatePayment()
		{
			return new MomoOneTimePayment(accessKey, secretKey, partnerCode, storeId, storeName);
		}
  }
}
