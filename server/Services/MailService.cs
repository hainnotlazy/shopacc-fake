using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
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

		public async Task<bool> SendMailAsync(string emailDestination, string subject, string body)
		{
			try
			{
				var mailClient = new SmtpClient(SERVER, PORT)
				{
					EnableSsl = true,
					Credentials = new NetworkCredential(EMAIL_ADDRESS, EMAIL_PASSWORD)
				};

				await mailClient.SendMailAsync(
					new MailMessage(EMAIL_ADDRESS, emailDestination, subject, body)
				);

				return true;
			}
			catch (Exception)
			{
				return false;
			}
		}

		public async Task<bool> SendVerificationMailAsync(
			string emailDestination,
			string verificationCode
		)
		{
			return await SendMailAsync(
				emailDestination,
				"[ShopAcc.Fake] Verify Your Account",
				$"Your email verification code is: {verificationCode}"
			);
		}
	}
}
