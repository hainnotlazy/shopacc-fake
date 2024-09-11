using server.Services.Interfaces;

namespace server.Services {
	public class ImageFileService: FileService, IImageFileService {
		private readonly List<string> ImageMimeTypes = [
			"image/png", "image/jpeg", "image/gif", "image/pjpeg"
		];

		public void CompressAsync(string filePath)
		{
			throw new NotImplementedException();
		}

		public override bool IsSupported(IFormFile formFile) {
			return ImageMimeTypes.Contains(formFile.ContentType);
		}

		private void Resize(int size) {

		}
	}
}
