using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace server.Services.Interfaces
{
	public interface IMailService
	{
		Task<bool> SendMailAsync(string EmailDestination, string Subject, string Body);
		Task<bool> SendVerificationMailAsync(string EmailDestination, string VerificationCode);
	}
}
