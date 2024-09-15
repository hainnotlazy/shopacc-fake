using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Profile;
using server.Dtos.Response;
using server.Dtos.User;
using server.Services.Interfaces;

namespace server.Controllers {
	[ApiController]
	[Route("api/profile")]
	public class ProfileController(IProfileService profileService): ControllerBase {

		[HttpGet("info")]
		[Authorize]
		public async Task<ActionResult<UserDto>> GetCurrentUser()
		{
			if (User.Identity is not ClaimsIdentity user)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
			}
			int.TryParse(user.FindFirst("UId")?.Value, out int userId);

			return await profileService.GetCurrentUser(userId);
		}

		[HttpPut("darkmode")]
		[Authorize]
		public async Task<ActionResult<UserDto>> ToggleUseDarkMode([FromBody] bool useDarkMode) {
			if (User.Identity is not ClaimsIdentity user)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("Authentication failed!"));
			}

	  	_ = int.TryParse(user.FindFirst("UId")?.Value, out int userId);

			return await profileService.ToggleDarkMode(userId, useDarkMode);
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

			return await profileService.SendVerificationCodeEmail(userId);
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

			return await profileService.VerifyEmail(userId, requestDto);
		}

		[HttpPut("update")]
		[Authorize]
		public async Task<ActionResult<UserDto>> UpdateProfile([FromForm] UpdateProfileRequestDto profileRequestDto) {
			if (User.Identity is not ClaimsIdentity user)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("Authentication failed!"));
			}

	  	_ = int.TryParse(user.FindFirst("UId")?.Value, out int userId);

			return await profileService.UpdateProfile(userId, profileRequestDto);
		}
	}
}
