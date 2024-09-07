using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Request;
using server.Dtos.Response;
using server.Dtos.User;
using server.Services.Interfaces;

namespace server.Controllers
{
	[ApiController]
	[Route("api/auth")]
	public class AuthController(IAuthService authService) : ControllerBase
	{
		private readonly IAuthService _authService = authService;

		[HttpPost]
		[Route("register")]
		public async Task<ActionResult<AuthenticatedResponse>> Register(
			[FromBody] RegisterUserRequestDto requestDto
		)
		{
			return await _authService.RegisterAsync(requestDto);
		}

		[HttpPost]
		[Route("login")]
		public async Task<ActionResult<AuthenticatedResponse>> Login(
			[FromBody] LoginUserRequestDto requestDto
		)
		{
			return await _authService.LoginAsync(requestDto);
		}

		[HttpPost]
		[Route("refresh")]
		public async Task<ActionResult<AuthenticatedResponse>> RefreshTokens(
			[FromBody] RefreshTokenRequestDto requestDto
		)
		{
			return await _authService.RefreshTokensAsync(requestDto);
		}

		[HttpPost]
		[Route("external-login")]
		public async Task<ActionResult<AuthenticatedResponse>> HandleExternalLogin(
			[FromBody] ExternalLoginRequest request
		)
		{
			if (
				string.Equals(
					request.LoginProvider,
					GoogleDefaults.AuthenticationScheme,
					StringComparison.OrdinalIgnoreCase
				)
			)
			{
				return await _authService.HandleGoogleLoginAsync(request.AuthorizationCode);
			}
			else
			{
				return new BadRequestObjectResult(
					ErrorResponse.BadRequestResponse("Unknown login provider")
				);
			}
		}

		[HttpPost]
		[Route("admin-login")]
		public async Task<ActionResult<AuthenticatedResponse>> HandleAdminLogin(
			[FromBody] LoginUserRequestDto requestDto
		)
		{
			return await _authService.HandleAdminLoginAsync(requestDto);
		}
	}
}
