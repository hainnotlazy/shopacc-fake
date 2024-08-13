using Microsoft.AspNetCore.Mvc;
using server.Dtos.Response;
using server.Dtos.User;

namespace server.Services.Interfaces
{
	public interface IAuthService
	{
		Task<ActionResult<AuthenticatedResponse>> RegisterAsync(RegisterUserRequestDto requestDto);

		Task<ActionResult<AuthenticatedResponse>> LoginAsync(LoginUserRequestDto requestDto);
		Task<ActionResult<AuthenticatedResponse>> HandleGoogleLoginAsync(string googleAuthCode);

		string GenerateToken(TokenType type, TokenPayload payload);
	}
}
