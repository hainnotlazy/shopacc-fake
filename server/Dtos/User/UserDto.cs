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
		public bool IsEmailVerified { get; set; }
	}
}
