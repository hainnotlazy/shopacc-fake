using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using server.Services.Interfaces;

namespace server.Services
{
	public class MailService : IMailService
	{
		private readonly IConfiguration _configuration;
		private readonly string SERVER;
		private readonly int PORT;
		private readonly string EMAIL_ADDRESS;
		private readonly string EMAIL_PASSWORD;

		public MailService(IConfiguration configuration)
		{
			_configuration = configuration;

			SERVER = _configuration["MailSettings:Server"] ?? "smtp.gmail.com";
			PORT = int.Parse(_configuration["MailSettings:Port"] ?? 587.ToString());
			EMAIL_ADDRESS = _configuration["MailSettings:EmailAddress"] ?? "shopacc.fake@gmail.com";
			EMAIL_PASSWORD = _configuration["MailSettings:EmailPassword"] ?? "shopacc.fake.password";
		}

		public async void SendMailAsync(string EmailDestination, string Subject, string Body)
		{
			var mailClient = new SmtpClient(SERVER, PORT)
			{
				EnableSsl = true,
				Credentials = new NetworkCredential(EMAIL_ADDRESS, EMAIL_PASSWORD)
			};

			await mailClient.SendMailAsync(
				new MailMessage(EMAIL_ADDRESS, EmailDestination, Subject, Body)
			);
		}
	}
}
