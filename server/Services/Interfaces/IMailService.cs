using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace server.Services.Interfaces
{
	public interface IMailService
	{
		Task<bool> SendMailAsync(string emailDestination, string subject, string body);
		Task<bool> SendVerificationMailAsync(string emailDestination, string verificationCode);
	}
}
