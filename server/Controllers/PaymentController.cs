using Microsoft.AspNetCore.Mvc;
using server.DesignPatterns.Factories;
using server.Dtos.Payment;
using server.Dtos.Payment.Momo;
using server.Services.Interfaces;

namespace server.Controllers {
	[ApiController]
	[Route("api/payment")]
	public class PaymentController(IPaymentService paymentService): ControllerBase {
		private readonly IPaymentService _paymentService = paymentService;

		[HttpGet]
		[Route("create")]

		public async Task<ActionResult<InitPaymentResponse>> CreatePayment(string request, long amount) {
			return await _paymentService.CreatePayment(request, amount);
		}

		[HttpGet]
		[Route("momo/ipn")]
		public ActionResult OnMomoPaymentCallback(OneTimePaymentCallback callback) {
			MomoPaymentIPNHandler momoPaymentIPNHandler = new("F8BBA842ECF85", "K951B6PE1waDMi640xX08PD3vg6EkVlz", "MOMO");

			return momoPaymentIPNHandler.ValidateIPN(callback, new ActionValidationCallback<OneTimePaymentCallback>(
				onSuccess: (momoCallback) => {
					Console.WriteLine("I am free");
				},
				onFailure: (momoCallback, message) => {
					Console.WriteLine("I am not free");
				}
			));
		}
	}
}
