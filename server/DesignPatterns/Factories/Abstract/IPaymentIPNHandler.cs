using Microsoft.AspNetCore.Mvc;

namespace server.DesignPatterns.Factories.Abstract {
	public interface IPaymentIPNHandler<T> {
		ActionResult ValidateIPN(T t, IValidationCallback<T> validationCallback);
	}
}
