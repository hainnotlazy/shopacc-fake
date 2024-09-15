using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DbContexts;
using server.Dtos.Profile;
using server.Dtos.Response;
using server.Dtos.User;
using server.Mappers;
using server.Models;
using server.Services.Interfaces;

namespace server.Services {
  public class ProfileService(DefaultDbContext defaultDbContext, IMailService mailService, IImageFileService imageFileService) : IProfileService
  {
		private static readonly string IMAGES_FOLDER = "images";

		private readonly DbSet<User> _usersRepository = defaultDbContext.Users;
		private readonly DefaultDbContext _defaultDbContext = defaultDbContext;
		private readonly IMailService _mailService = mailService;
		private readonly IImageFileService _imageFileService = imageFileService;
		private readonly string IMAGES_FOLDER_PATH = Path.Combine(Environment.CurrentDirectory, IMAGES_FOLDER);

		public async Task<ActionResult<UserDto>> ChangePassword(int userId, string newPwd)
		{
			var existingUser = await _usersRepository.FirstOrDefaultAsync(user => user.Id == userId);

			if (existingUser == null)
			{
				return new NotFoundObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
			}

			existingUser.Password = BCrypt.Net.BCrypt.HashPassword(newPwd);

			int affectedRows = await _defaultDbContext.SaveChangesAsync();

			if(affectedRows < 1) {
				 return new BadRequestObjectResult(ErrorResponse.InternalServerErrorResponse("Set password failed"));
			}

			return existingUser.ToUserDto();
		}

		public async Task<ActionResult<UserDto>> ToggleDarkMode(int userId, bool useDarkMode)
		{
			var existingUser = await _usersRepository.FirstOrDefaultAsync(user => user.Id == userId);

			if (existingUser == null)
			{
				return new NotFoundObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
			}

			existingUser.UseDarkMode = useDarkMode;

			int affectedRows = await _defaultDbContext.SaveChangesAsync();

			if(affectedRows < 1) {
				 return new BadRequestObjectResult(ErrorResponse.InternalServerErrorResponse("Toggle dark mode failed"));
			}

			return existingUser.ToUserDto();
		}

		public async Task<ActionResult<UserDto>> UpdateProfile(int userId, UpdateProfileRequestDto profileRequestDto)
		{
			var existingUser = await _usersRepository.FirstOrDefaultAsync(user => user.Id == userId);

			if (existingUser == null)
			{
				return new NotFoundObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
			}

			// Handle save avatar
			if (profileRequestDto.Avatar != null)
			{
				//existingUser.Avatar = await SaveUserAvatar(requestDto.Avatar);
				var fileResult = await _imageFileService.SaveAsync(profileRequestDto.Avatar, IMAGES_FOLDER_PATH);
				existingUser.Avatar = fileResult.FileName;
			}

			existingUser.Fullname = profileRequestDto.Fullname ?? existingUser.Fullname;
			existingUser.Bio = profileRequestDto.Bio ?? existingUser.Bio;
			existingUser.UpdatedAt = DateTime.Now;

			int affectedRows = await _defaultDbContext.SaveChangesAsync();

			if(affectedRows < 1) {
				 return new BadRequestObjectResult(ErrorResponse.InternalServerErrorResponse("Update profile failed"));
			}

			return existingUser.ToUserDto();
		}

		public async Task<ActionResult<UserDto>> GetCurrentUser(int userId)
		{
			var existingUser = await _usersRepository.FirstOrDefaultAsync(user => user.Id.Equals(userId));
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
			var existingUser = await _usersRepository.FirstOrDefaultAsync(user => user.Id.Equals(userId));

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
			_usersRepository.Update(existingUser);
			await _defaultDbContext.SaveChangesAsync();

			return new OkObjectResult(existingUser.ToResendVerificationCodeResponse());
		}

		public async Task<ObjectResult> VerifyEmail(int userId, VerifyEmailRequestDto requestDto)
		{
			var existingUser = await _usersRepository.FirstOrDefaultAsync(user => user.Id.Equals(userId));
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
			_usersRepository.Update(existingUser);
			await _defaultDbContext.SaveChangesAsync();

			return new OkObjectResult("Verify email successfully!");
		}
  }
}
