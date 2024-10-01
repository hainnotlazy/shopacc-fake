using Microsoft.AspNetCore.Mvc;
using server.DesignPatterns.Factories.Abstract;
using server.Dtos.Payment.Momo;
using server.Utils;

namespace server.DesignPatterns.Factories {
  public class MomoPaymentIPNHandler(string accessKey, string secretKey, string partnerCode): IPaymentIPNHandler<OneTimePaymentCallback>
  {
		public ActionResult ValidateIPN(OneTimePaymentCallback callback, IValidationCallback<OneTimePaymentCallback> validationCallback)
		{
			if(VerifySignature(callback)) {
				validationCallback.OnSuccess(callback);
			} else {
				validationCallback.OnFailure(callback, "Signature is invalid");
			}
			return new NoContentResult();
		}

		private bool VerifySignature(OneTimePaymentCallback callback)
		{
			string rawSignature = $"accessKey={accessKey}&amount={callback.Amount}&extraData={callback.ExtraData}" +
														$"&message={callback.Message}&orderId={callback.OrderId}&orderInfo={callback.OrderInfo}" +
														$"&orderType={callback.OrderType}&partnerCode={partnerCode}&payType={callback.PayType}" +
														$"&requestId={callback.RequestId}&responseTime={callback.ResponseTime}&resultCode={callback.ResultCode}" +
														$"&transId={callback.TransId}";
			string signature = HmacSHA256Utils.HashString(rawSignature, secretKey, true);
			return callback.Signature.Equals(signature);
		}
  }
}
