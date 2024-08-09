using Microsoft.AspNetCore.Mvc;
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
		public async Task<ActionResult<AuthenticatedResponse>> Register([FromBody] RegisterUserRequestDto requestDto)
		{
			return await _authService.RegisterAsync(requestDto);
		}

		[HttpPost]
		[Route("login")]
		public async Task<ActionResult<AuthenticatedResponse>> Login([FromBody] LoginUserRequestDto requestDto)
		{
			return await _authService.LoginAsync(requestDto);
		}
	}
}
