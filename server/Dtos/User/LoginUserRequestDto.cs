using System.ComponentModel.DataAnnotations;

namespace server.Dtos.User
{
	public class LoginUserRequestDto
	{
		[Required(ErrorMessage = "Username is required")]
		[StringLength(80, MinimumLength = 3, ErrorMessage = "Username is invalid")]
		public required string Username { get; set; }

		[Required(ErrorMessage = "Password is required")]
		[StringLength(150, MinimumLength = 8, ErrorMessage = "Password is invalid")]
		public required string Password { get; set; }

		public bool RememberMe { get; set; } = false;
	}
}
