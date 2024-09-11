namespace server.Dtos.Profile {
	public class UpdateProfileRequestDto {
		public string? Fullname { get; set; }
		public string? Bio { get; set; }
		public IFormFile? Avatar { get; set; }
	}
}
