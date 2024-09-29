namespace server.Dtos.Payment {
	public interface IHasSignature {
		void CreateSignature(string secretKey);
		bool VerifySignature(string signature, string secretKey);
	}
}
