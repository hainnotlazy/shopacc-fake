using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Interfaces
{
	public interface IMailService
	{
		void SendMailAsync(string EmailDestination, string Subject, string Body);
	}
}
