using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.User
{
	public class RefreshTokenRequestDto
	{
		[Required(ErrorMessage = "Refresh token is required")]
		public required string RefreshToken { get; set; }
	}
}
