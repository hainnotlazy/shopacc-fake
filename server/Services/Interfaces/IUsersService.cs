using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Response;
using server.Dtos.User;

namespace server.Services.Interfaces
{
	public interface IUsersService
	{
		Task<ActionResult<UserDto>> GetCurrentUser(int userId);
		Task<ActionResult<ResendVerificationCodeResponse>> GetNextVerificationCodeTime(int userId);
		Task<ActionResult<ResendVerificationCodeResponse>> SendVerificationCodeEmail(int userId);
		Task<ObjectResult> VerifyEmail(int userId, VerifyEmailRequestDto requestDto);
	}
}
