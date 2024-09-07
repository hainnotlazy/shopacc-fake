using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models
{
	[Table("Users")]
	[Index(nameof(Username), nameof(Email), IsUnique = true)]
	public class User
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[StringLength(80, MinimumLength = 3)]
		public required string Username { get; set; }

		[Required]
		public required string Password { get; set; }

		[Required]
		[StringLength(255)]
		public required string Email { get; set; }

		public string Fullname { get; set; } = $"Client {new Random().Next(1, 999999)}";

		public string? Bio { get; set; }

		public int Balance { get; set; } = 0;

		public string? Avatar { get; set; }

		[StringLength(6)]
		public int EmailVerificationCode { get; set; } = new Random().Next(100000, 999999);

		public bool IsEmailVerified { get; set; } = false;

		public DateTime NextEmailVerificationTime { get; set; } = DateTime.Now;

		public bool UseDarkMode { get; set; } = false;

		public bool IsAdmin { get; set; } = false;

		public bool IsActive { get; set; } = true;

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public DateTime UpdatedAt { get; set; } = DateTime.Now;
	}
}
