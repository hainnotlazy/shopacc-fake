using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.User;

namespace server.Services.Interfaces
{
	public interface IUsersService
	{
		Task<ObjectResult> SendVerificationCodeEmail(int UserId);
		Task<ObjectResult> VerifyEmail(int UserId, VerifyEmailRequestDto requestDto);
	}
}
