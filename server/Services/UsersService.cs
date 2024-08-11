using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DbContexts;
using server.Dtos.Response;
using server.Models;
using server.Services.Interfaces;

namespace server.Services
{
	public class UsersService : IUsersService
	{
		private readonly DefaultDbContext _context;
		private readonly DbSet<User> _userRepository;
		private readonly IMailService _mailService;

		public UsersService(DefaultDbContext context, IMailService mailService)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
			_userRepository = _context.Users;
			_mailService = mailService;
		}

		public async Task<ObjectResult> SendVerificationCodeEmail(int UserId)
		{
			var existingUser = await _userRepository.FirstOrDefaultAsync(user =>
				user.Id.Equals(UserId)
			);

			// Validate user
			if (existingUser == null)
			{
				return new BadRequestObjectResult(new ErrorResponse(
					HttpErrorStatusCode.NotFound,
					"User not found!"
				));
			}
			else if (existingUser.IsEmailVerified)
			{
				return new BadRequestObjectResult(new ErrorResponse(
					HttpErrorStatusCode.BadRequest,
					"Email already verified!"
				));
			}
			else if (existingUser.NextEmailVerificationTime > DateTime.Now)
			{
				return new BadRequestObjectResult(new ErrorResponse(
					HttpErrorStatusCode.BadRequest,
					"Please wait for 15 minutes to resend verification email!"
				));
			}

			// Send verification email
			bool sendMailResult = await _mailService.SendVerificationMailAsync(
				existingUser.Email,
				existingUser.EmailVerificationCode.ToString()
			);
			if (!sendMailResult)
			{
				return new BadRequestObjectResult(new ErrorResponse(HttpErrorStatusCode.BadRequest, "Failed to send verification email!"));
			}

			// Update next get verification email time
			existingUser.NextEmailVerificationTime = DateTime.Now.AddMinutes(15);
			_userRepository.Update(existingUser);
			await _context.SaveChangesAsync();

			return new OkObjectResult("Send verification code email successfully!");
		}

		public void UpdateVerificationStatusEmail()
		{
			throw new NotImplementedException();
		}
	}
}
