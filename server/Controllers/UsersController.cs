using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Response;
using server.Services.Interfaces;

namespace server.Controllers
{
	[ApiController]
	[Route("api/users")]
	public class UsersController(IUsersService usersService) : ControllerBase
	{
		[Authorize]
		[HttpPost]
		[Route("resend-verification-mail")]
		public async Task<ObjectResult> SendVerificationCodeEmail()
		{
			// Get UId from User.Identity
			if (User.Identity is not ClaimsIdentity user)
			{
				return new BadRequestObjectResult(new ErrorResponse(
					HttpErrorStatusCode.NotFound,
					"User not found!"
				));
			}

			int.TryParse(user.FindFirst("UId")?.Value, out int userId);

			return await usersService.SendVerificationCodeEmail(userId);
		}
	}
}
