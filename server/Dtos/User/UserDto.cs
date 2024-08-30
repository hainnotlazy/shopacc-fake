using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.User
{
	public class UserDto
	{
		public int Id { get; set; }
		public required string Username { get; set; }
		public required string Email { get; set; }
		public string? Fullname { get; set; }
		public string? Bio { get; set; }
		public int Balance { get; set; }
		public string? Avatar { get; set; }
		public bool IsEmailVerified { get; set; }
		public DateTime NextEmailVerificationTime { get; set; }
		public bool UseDarkMode { get; set; }
		public bool IsActive { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }
	}
}
