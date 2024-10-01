namespace server.DesignPatterns.Factories.Abstract {
	public interface IValidationCallback<T> {
		void OnSuccess(T t);
		void OnFailure(T t, string message);
	}
}
