using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DbContexts;
using server.Dtos.Response;
using server.Dtos.User;
using server.Mappers;
using server.Models;
using server.Services.Interfaces;

namespace server.Services
{
	public class UsersService : IUsersService
	{
		private readonly string IMAGES_FOLDER = "images";
		private readonly string IMAGES_FOLDER_PATH;

		private readonly DefaultDbContext _context;
		private readonly DbSet<User> _userRepository;
		private readonly IMailService _mailService;
		private readonly IImageFileService _imageFileService;
		//private readonly IWebHostEnvironment _environment;

		public UsersService(
			DefaultDbContext context,
			IMailService mailService,
			IImageFileService imageFileService,
			IWebHostEnvironment environment
		)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
			_userRepository = _context.Users;
			_mailService = mailService;
			_imageFileService = imageFileService;
			//_environment = environment;
			//IMAGES_FOLDER_PATH = Path.Combine(_environment.WebRootPath, IMAGES_FOLDER);
			IMAGES_FOLDER_PATH = Path.Combine(Environment.CurrentDirectory, IMAGES_FOLDER);
		}

		public async Task<ActionResult<UserDto>> GetCurrentUser(int userId)
		{
			var existingUser = await _userRepository.FirstOrDefaultAsync(user => user.Id.Equals(userId));
			if (existingUser == null)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
			}

			return new OkObjectResult(existingUser.ToUserDto());
		}

		public async Task<ActionResult<ResendVerificationCodeResponse>> SendVerificationCodeEmail(
			int userId
		)
		{
			var existingUser = await _userRepository.FirstOrDefaultAsync(user => user.Id.Equals(userId));

			// Validate user
			if (existingUser == null)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
			}
			else if (existingUser.IsEmailVerified)
			{
				return new BadRequestObjectResult(
					ErrorResponse.BadRequestResponse("Email already verified!")
				);
			}
			else if (existingUser.NextEmailVerificationTime > DateTime.Now)
			{
				return new BadRequestObjectResult(
					ErrorResponse.BadRequestResponse("Please wait until next email verification time!")
				);
			}

			// Send verification email
			bool sendMailResult = await _mailService.SendVerificationMailAsync(
				existingUser.Email,
				existingUser.EmailVerificationCode.ToString()
			);
			if (!sendMailResult)
			{
				return new BadRequestObjectResult(
					ErrorResponse.BadRequestResponse("Failed to send verification email!")
				);
			}

			// Update next get verification email time
			existingUser.NextEmailVerificationTime = DateTime.Now.AddMinutes(15);
			_userRepository.Update(existingUser);
			await _context.SaveChangesAsync();

			return new OkObjectResult(existingUser.ToResendVerificationCodeResponse());
		}

		public async Task<ObjectResult> VerifyEmail(int userId, VerifyEmailRequestDto requestDto)
		{
			var existingUser = await _userRepository.FirstOrDefaultAsync(user => user.Id.Equals(userId));
			int code = int.Parse(requestDto.VerificationCode);

			// Validate
			if (existingUser == null)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
			}
			else if (existingUser.IsEmailVerified)
			{
				return new BadRequestObjectResult(
					ErrorResponse.BadRequestResponse("Email already verified!")
				);
			}
			else if (existingUser.EmailVerificationCode != code)
			{
				return new BadRequestObjectResult(
					ErrorResponse.BadRequestResponse("Incorrect verification code!")
				);
			}

			// Update user
			existingUser.EmailVerificationCode = 0;
			existingUser.IsEmailVerified = true;
			_userRepository.Update(existingUser);
			await _context.SaveChangesAsync();

			return new OkObjectResult("Verify email successfully!");
		}

		public async Task<ActionResult<UserDto>> UpdateUser(int userId, UpdateUserRequestDto requestDto)
		{
			var existingUser = await _userRepository.FirstOrDefaultAsync(user => user.Id.Equals(userId));
			if (existingUser == null)
			{
				return new BadRequestObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
			}

			// Handle save avatar
			if (requestDto.Avatar != null)
			{
				//existingUser.Avatar = await SaveUserAvatar(requestDto.Avatar);
				var fileResult = await _imageFileService.SaveAsync(requestDto.Avatar, IMAGES_FOLDER_PATH);
				existingUser.Avatar = fileResult.FileName;
			}

			// Update existing user
			existingUser.UseDarkMode = requestDto.UseDarkMode ?? existingUser.UseDarkMode;
			existingUser.Fullname = requestDto.Fullname ?? existingUser.Fullname;
			existingUser.Bio = requestDto.Bio ?? existingUser.Bio;
			existingUser.UpdatedAt = DateTime.Now;

			_userRepository.Update(existingUser);
			await _context.SaveChangesAsync();

			return new OkObjectResult(existingUser.ToUserDto());
		}

		private async Task<string> SaveUserAvatar(IFormFile avatar)
		{
			Directory.CreateDirectory(IMAGES_FOLDER_PATH);

			string fileExtension = Path.GetExtension(avatar.FileName);
			string fileName = $"{Guid.NewGuid()}{fileExtension}";
			string filePath = Path.Combine(IMAGES_FOLDER_PATH, fileName);

			using (var fileStream = new FileStream(filePath, FileMode.Create))
			{
				await avatar.CopyToAsync(fileStream);
			}

			return $"/{IMAGES_FOLDER}/{fileName}";
		}
	}
}
