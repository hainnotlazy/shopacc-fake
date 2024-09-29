using Microsoft.AspNetCore.Mvc;
using server.Dtos.Payment;

namespace server.Services.Interfaces {
	public interface IPaymentService {
		Task<ActionResult<InitPaymentResponse>> CreatePayment(string request, long amount);
	}
}
