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
		Task<ActionResult<UserDto>> GetCurrentUser(int UserId);
		Task<ActionResult<ResendVerificationCodeResponse>> GetNextVerificationCodeTime(int UserId);
		Task<ObjectResult> SendVerificationCodeEmail(int UserId);
		Task<ObjectResult> VerifyEmail(int UserId, VerifyEmailRequestDto requestDto);
	}
}
