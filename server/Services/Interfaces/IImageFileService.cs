namespace server.Services.Interfaces {
	public interface IImageFileService: IFileService {
		void CompressAsync(string filePath);
	}
}
