using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Response;
using server.Dtos.User;
using server.Services.Interfaces;

namespace server.Controllers
{
	[ApiController]
	[Route("api/users")]
	public class UsersController(IUsersService usersService) : ControllerBase
	{
		[Authorize]
		[HttpGet]
		[Route("")]
		public async Task<ActionResult<UserDto>> GetCurrentUser()
		{
			if (User.Identity is not ClaimsIdentity user)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
			}
			int.TryParse(user.FindFirst("UId")?.Value, out int userId);

			return await usersService.GetCurrentUser(userId);
		}

		[Authorize]
		[HttpGet]
		[Route("next-verification-time")]
		public async Task<ActionResult<ResendVerificationCodeResponse>> GetNextVerificationCodeTime()
		{
			if (User.Identity is not ClaimsIdentity user)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
			}
			int.TryParse(user.FindFirst("UId")?.Value, out int userId);

			return await usersService.GetNextVerificationCodeTime(userId);
		}

		[Authorize]
		[HttpPost]
		[Route("resend-verification-mail")]
		public async Task<ActionResult<ResendVerificationCodeResponse>> SendVerificationCodeEmail()
		{
			if (User.Identity is not ClaimsIdentity user)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
			}
			int.TryParse(user.FindFirst("UId")?.Value, out int userId);

			return await usersService.SendVerificationCodeEmail(userId);
		}

		[Authorize]
		[HttpPost]
		[Route("verify-email")]
		public async Task<ObjectResult> VerifyEmail([FromBody] VerifyEmailRequestDto requestDto)
		{
			if (User.Identity is not ClaimsIdentity user)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
			}
			int.TryParse(user.FindFirst("UId")?.Value, out int userId);

			return await usersService.VerifyEmail(userId, requestDto);
		}
	}
}
