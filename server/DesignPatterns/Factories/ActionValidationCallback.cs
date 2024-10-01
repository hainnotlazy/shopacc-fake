using server.DesignPatterns.Factories.Abstract;

namespace server.DesignPatterns.Factories {
  public class ActionValidationCallback<T>(Action<T> onSuccess, Action<T, string> onFailure): IValidationCallback<T>
  {
		public void OnFailure(T t, string message)
		{
			onFailure(t, message);
		}

		public void OnSuccess(T t)
		{
			onSuccess(t);
		}
  }
}
