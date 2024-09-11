using server.Dtos.File;

namespace server.Services.Interfaces {
	public interface IFileService {
		void GetAsync(string filePath);
		byte[] GetAsByteAsync(string filePath);
		Task<FileResult> SaveAsync(IFormFile formFile, string directoryPath);
		string GetMimeType(string fileName);
		bool IsSupported(IFormFile formFile);
	}
}
