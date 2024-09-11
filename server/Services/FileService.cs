using server.Dtos.File;
using server.Services.Interfaces;

namespace server.Services {
  public class FileService : IFileService
  {
		public byte[] GetAsByteAsync(string filePath)
		{
			throw new NotImplementedException();
		}

		public void GetAsync(string filePath)
		{
			throw new NotImplementedException();
		}

		public string GetMimeType(string fileName)
		{
			throw new NotImplementedException();
		}

		public virtual bool IsSupported(IFormFile formFile)
		{
			return true;
		}

		public async Task<FileResult> SaveAsync(IFormFile formFile, string directoryPath)
		{
			if(formFile == null)
      {
        throw new ArgumentException("File cannot be null or empty.");
      }

			if(!IsSupported(formFile))
			{
        throw new NotSupportedException($"File with extension {formFile.ContentType} is not supported");
      }

      if(!Directory.Exists(directoryPath))
			{
        Directory.CreateDirectory(directoryPath);
      }

			// string encryptedFileName = Path.GetRandomFileName();
			string encryptedFileName = Guid.NewGuid().ToString();
			string extension = Path.GetExtension(formFile.FileName);
			string fileName = $"{encryptedFileName}{extension}";
    	string uriPath = Path.Combine(directoryPath, fileName);

      using Stream stream = File.Create(uriPath);

			await formFile.CopyToAsync(stream);

			DateTime now = DateTime.Now;

			FileResult fileResult = new (fileName, formFile.ContentType, uriPath, DateTime.Now, null);

      return fileResult;
		}
  }
}
