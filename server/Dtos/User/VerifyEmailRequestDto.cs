using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Identity.Client;

namespace server.Dtos.User
{
	public class VerifyEmailRequestDto
	{
		[Required(ErrorMessage = "Verification code is required")]
		[MinLength(6, ErrorMessage = "Verification code must be 6 characters")]
		[MaxLength(6, ErrorMessage = "Verification code must be 6 characters")]
		public required string VerificationCode { get; set; }
	}
}
