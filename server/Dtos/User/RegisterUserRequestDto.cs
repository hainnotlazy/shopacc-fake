using System.ComponentModel.DataAnnotations;

namespace server.Dtos.User
{
	public class RegisterUserRequestDto
	{
		[Required(ErrorMessage = "Username is required")]
		[MinLength(3, ErrorMessage = "Username must be at least 3 characters")]
		[MaxLength(80, ErrorMessage = "Username must be at most 80 characters")]
		public required string Username { get; set; }

		[Required(ErrorMessage = "Password is required")]
		[MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
		[MaxLength(150, ErrorMessage = "Password must be at most 255 characters")]
		public required string Password { get; set; }

		[Required(ErrorMessage = "Email is required")]
		[EmailAddress(ErrorMessage = "Email is invalid")]
		[MaxLength(255, ErrorMessage = "Email must be at most 255 characters")]
		public required string Email { get; set; }
	}
}
