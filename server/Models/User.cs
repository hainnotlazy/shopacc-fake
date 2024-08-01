using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

		[StringLength(255)]
		public string? Email { get; set; }
	}
}
