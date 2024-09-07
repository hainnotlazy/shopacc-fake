using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.User
{
	public class UpdateUserRequestDto
	{
		public string? Fullname { get; set; }
		public string? Bio { get; set; }
		public IFormFile? Avatar { get; set; }
		public bool? UseDarkMode { get; set; }
	}
}
