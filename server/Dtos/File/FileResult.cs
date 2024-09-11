namespace server.Dtos.File {
	public class FileResult(string FileName, string MimeType, string UriPath, DateTime? CreatedDate, DateTime? LastModifiedDate) {

		public string FileName { get; } = FileName;
		public string MimeType { get; } = MimeType;
		public string UriPath { get; } = UriPath;
		public DateTime? CreatedDate { get; } = CreatedDate;
		public DateTime? LastModifiedDate { get; } = LastModifiedDate;
	}
}
