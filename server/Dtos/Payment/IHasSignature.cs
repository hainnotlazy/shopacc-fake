namespace server.Dtos.Payment {
	public interface IHasSignature {
		void CreateSignature(string secretKey, string accessKey);
		bool VerifySignature(string signature, string secretKey, string accessKey);
	}
}
