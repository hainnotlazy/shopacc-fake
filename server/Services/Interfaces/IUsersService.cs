using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace server.Services.Interfaces
{
	public interface IUsersService
	{
		Task<ObjectResult> SendVerificationCodeEmail(int UserId);
		void UpdateVerificationStatusEmail();
	}
}
