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
		private readonly IProfileService _profileService = profileService;

		[HttpPut("darkmode")]
		[Authorize]
		public async Task<ActionResult<UserDto>> ToggleUseDarkMode([FromBody] bool useDarkMode) {
			if (User.Identity is not ClaimsIdentity user)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("Authentication failed!"));
			}

	  	_ = int.TryParse(user.FindFirst("UId")?.Value, out int userId);

			return await _profileService.ToggleDarkMode(userId, useDarkMode);
		}

		[HttpPut("update")]
		[Authorize]
		public async Task<ActionResult<UserDto>> UpdateProfile([FromForm] UpdateProfileRequestDto profileRequestDto) {
			if (User.Identity is not ClaimsIdentity user)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("Authentication failed!"));
			}

	  	_ = int.TryParse(user.FindFirst("UId")?.Value, out int userId);

			return await _profileService.UpdateProfile(userId, profileRequestDto);
		}
	}
}
