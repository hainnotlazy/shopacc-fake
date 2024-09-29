using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using server.DesignPatterns.Factories;
using server.DesignPatterns.Factories.Abstract;
using server.Dtos.Payment;
using server.Enums;
using server.Services.Interfaces;

namespace server.Services {
  public class PaymentService(IConfiguration configuration): IPaymentService
  {
		public async Task<ActionResult<InitPaymentResponse>> CreatePayment(string request, long amount)
		{
			IPaymentFactory paymentFactory;
			string orderId = DateTime.Now.ToString("ddMMyyyyhhmmss");
			string orderDescription = "pay with Momo";

			if(request.Equals(nameof(PaymentGateway.Momo), StringComparison.OrdinalIgnoreCase)) {
				string partnerCode = configuration["Payment:Momo:PartnerCode"]!;
				string accessKey = configuration["Payment:Momo:AccessKey"]!;
				string secretKey = configuration["Payment:Momo:SecretKey"]!;

				paymentFactory = new MomoOneTimePaymentFactory(accessKey, secretKey, partnerCode);
				InitPaymentResponse response = await paymentFactory.CreatePaymentAsync(orderId, orderDescription, amount);

				return new OkObjectResult(response);
			}
			else if(request.Equals(nameof(PaymentGateway.VnPay), StringComparison.OrdinalIgnoreCase)) {
				paymentFactory = new VnPayAllInOnePaymentFactory();
				return new OkObjectResult("VnPay is not available");
			}
			else {
				throw new ArgumentException("Payment request is not supported!");
			}
		}
  }
}
