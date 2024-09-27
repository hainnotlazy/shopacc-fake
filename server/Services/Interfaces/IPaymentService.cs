using Microsoft.AspNetCore.Mvc;
using server.Dtos.Payment;
using server.Enums;

namespace server.Services.Interfaces {
	public interface IPaymentService {
		ActionResult<InitPaymentResponse> CreatePayment(PaymentGateway paymentGateway, long amount);
	}
}
