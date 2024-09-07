using server.Dtos.Response;
using server.Dtos.User;
using server.Models;

namespace server.Mappers
{
	public static class UserMappers
	{
		public static UserDto ToUserDto(this User userModel)
		{
			return new UserDto
			{
				Id = userModel.Id,
				Username = userModel.Username,
				Email = userModel.Email,
				Fullname = userModel.Fullname,
				Bio = userModel.Bio,
				Balance = userModel.Balance,
				Avatar = userModel.Avatar,
				IsEmailVerified = userModel.IsEmailVerified,
				NextEmailVerificationTime = userModel.NextEmailVerificationTime,
				UseDarkMode = userModel.UseDarkMode,
				IsActive = userModel.IsActive,
				CreatedAt = userModel.CreatedAt,
				UpdatedAt = userModel.UpdatedAt
			};
		}

		public static User ToUserFromRegisterDto(this RegisterUserRequestDto registerUserDto)
		{
			return new User
			{
				Username = registerUserDto.Username.Trim(),
				Password = registerUserDto.Password.Trim(),
				Email = registerUserDto.Email.Trim()
			};
		}

		public static User ToUserFromLoginDto(this LoginUserRequestDto loginUserDto)
		{
			return new User
			{
				Username = loginUserDto.Username.Trim(),
				Password = loginUserDto.Password.Trim(),
				Email = ""
			};
		}

		public static ResendVerificationCodeResponse ToResendVerificationCodeResponse(
			this User userModel
		)
		{
			return new ResendVerificationCodeResponse
			{
				NextEmailVerificationTime = userModel.NextEmailVerificationTime,
			};
		}
	}
}
