using Microsoft.AspNetCore.Mvc;
using server.Dtos.Profile;
using server.Dtos.Response;
using server.Dtos.User;

namespace server.Services.Interfaces {
	public interface IProfileService {
		Task<ActionResult<UserDto>> ToggleDarkMode(int userId, bool useDarkMode);
		Task<ActionResult<UserDto>> UpdateProfile(int userId, UpdateProfileRequestDto profileRequestDto);
		Task<ActionResult<UserDto>> ChangePassword(int userId, string newPwd);
		Task<ActionResult<UserDto>> GetCurrentUser(int userId);
		Task<ActionResult<ResendVerificationCodeResponse>> SendVerificationCodeEmail(int userId);
		Task<ObjectResult> VerifyEmail(int userId, VerifyEmailRequestDto requestDto);
	}
}
