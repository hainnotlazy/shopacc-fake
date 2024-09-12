using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.IdentityModel.Tokens;
using server.DbContexts;
using server.Dtos.Response;
using server.Dtos.User;
using server.Mappers;
using server.Models;
using server.Services.Interfaces;

namespace server.Services
{
	public class AuthService : IAuthService
	{
		private readonly DefaultDbContext _context;
		private readonly DbSet<User> _usersRepository;
		private readonly IConfiguration _configuration;
		private readonly IMailService _mailService;
		private readonly IDistributedCache _redisCache;
		private readonly string ACCESS_TOKEN_SECRET;
		private readonly string REFRESH_TOKEN_SECRET;
		private readonly int ACCESS_TOKEN_LIFESPAN_DAYS;
		private readonly int REFRESH_TOKEN_LIFESPAN_DAYS;

		private readonly string OAUTH_CLIENT_ID;
		private readonly string OAUTH_CLIENT_SECRET;

		public AuthService(
			DefaultDbContext context,
			IConfiguration configuration,
			IMailService mailService,
			IDistributedCache redisCache
		)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
			_usersRepository = _context.Users;
			_configuration = configuration;
			_mailService = mailService;
			_redisCache = redisCache;

			ACCESS_TOKEN_SECRET =
				_configuration["JwtBearer:SecretKey"] ?? "access-token-very-secret-jwt-key";
			REFRESH_TOKEN_SECRET =
				_configuration["JwtBearer:RefreshTokenKey"] ?? "refresh-token-very-secret-jwt-key";
			ACCESS_TOKEN_LIFESPAN_DAYS = int.Parse(
				_configuration["JwtBearer:AccessTokenLifespanDays"] ?? 1.ToString()
			);
			REFRESH_TOKEN_LIFESPAN_DAYS = int.Parse(
				_configuration["JwtBearer:RefreshTokenLifespanDays"] ?? 30.ToString()
			);

			OAUTH_CLIENT_ID =
				_configuration["Authentication:Google:ClientId"] ?? "google-authentication-client-id";
			OAUTH_CLIENT_SECRET =
				_configuration["Authentication:Google:ClientSecret"]
				?? "google-authentication-client-secret";
		}

		public async Task<ActionResult<AuthenticatedResponse>> LoginAsync(
			LoginUserRequestDto requestDto
		)
		{
			User loginUser = requestDto.ToUserFromLoginDto();
			var existingUser = await _usersRepository.FirstOrDefaultAsync(user =>
				user.Username.Equals(loginUser.Username) || user.Email.Equals(loginUser.Username)
			);

			if (
				existingUser != null
				&& BCrypt.Net.BCrypt.Verify(requestDto.Password, existingUser.Password)
			)
			{
				TokenPayload payload = new(existingUser.Id, existingUser.Username);

				return new OkObjectResult(
					new AuthenticatedResponse(
						GenerateToken(TokenType.AccessToken, payload),
						GenerateToken(TokenType.RefreshToken, payload),
						existingUser.ToUserDto()
					)
				);
			}
			else
			{
				return new BadRequestObjectResult(
					ErrorResponse.BadRequestResponse("Invalid username or password!")
				);
			}
		}

		public async Task<ActionResult<AuthenticatedResponse>> RegisterAsync(
			RegisterUserRequestDto requestDto
		)
		{
			// Validation request
			var validationResult = await ValidateRegistrationAsync(requestDto);
			if (validationResult != null)
			{
				return validationResult;
			}

			// Create user
			var registerUser = requestDto.ToUserFromRegisterDto();
			registerUser.Password = BCrypt.Net.BCrypt.HashPassword(registerUser.Password);
			await _usersRepository.AddAsync(registerUser);
			await _context.SaveChangesAsync();

			// Send verification code to email (async)
			await _mailService.SendVerificationMailAsync(
				registerUser.Email,
				registerUser.EmailVerificationCode.ToString()
			);

			// Create token payload
			UserDto savedUser = registerUser.ToUserDto();
			TokenPayload payload = new(savedUser.Id, savedUser.Username);

			return new CreatedAtRouteResult(
				null,
				new AuthenticatedResponse(
					GenerateToken(TokenType.AccessToken, payload),
					GenerateToken(TokenType.RefreshToken, payload),
					savedUser
				)
			);
		}

		public async Task<ActionResult<AuthenticatedResponse>> RefreshTokensAsync(
			RefreshTokenRequestDto requestDto
		)
		{
			try
			{
				string refreshToken = requestDto.RefreshToken.Trim();

				// Validate refresh token
				var isBlacklisted = await this._redisCache.GetStringAsync(refreshToken);
				if (isBlacklisted != null)
				{
					return new BadRequestObjectResult(
						ErrorResponse.BadRequestResponse("Refresh token is blacklisted!")
					);
				}

				var tokenHandler = new JwtSecurityTokenHandler();
				var jwtToken = tokenHandler.ReadJwtToken(refreshToken);

				// Get userId & check if user exists
				int userId = int.Parse(jwtToken.Payload.Claims.First(x => x.Type == "UId").Value);
				int exp = int.Parse(jwtToken.Payload.Claims.First(x => x.Type == "exp").Value);
				var existingUser = await _usersRepository.FirstOrDefaultAsync(user => user.Id == userId);
				if (existingUser == null)
				{
					return new NotFoundObjectResult(ErrorResponse.NotFoundResponse("User not found!"));
				}

				// Blacklisted old refresh token
				long remainingTime = exp - new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
				await this.BlacklistToken(refreshToken, remainingTime);

				// Create token payload
				UserDto userDto = existingUser.ToUserDto();
				TokenPayload payload = new(userId, existingUser.Username);

				return new OkObjectResult(
					new AuthenticatedResponse(
						GenerateToken(TokenType.AccessToken, payload),
						GenerateToken(TokenType.RefreshToken, payload),
						userDto
					)
				);
			}
			catch (Exception)
			{
				return new BadRequestObjectResult(
					ErrorResponse.BadRequestResponse("Failed to refresh tokens!")
				);
			}
		}

		public async Task<ActionResult<AuthenticatedResponse>> HandleGoogleLoginAsync(
			string googleTokenId
		)
		{
			var payload = await VerifyGoogleToken(googleTokenId);
			if (payload == null)
			{
				return new BadRequestObjectResult(
					ErrorResponse.BadRequestResponse("Invalid google authorization code")
				);
			}

			var existingUser = await _usersRepository.FirstOrDefaultAsync(user =>
				user.Email.Equals(payload.Email)
			);

			// Create new user if user is not existing
			if (existingUser == null)
			{
				User newUser =
					new()
					{
						Username = payload.Email,
						Fullname = payload.Name,
						Password = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()),
						Email = payload.Email,
						IsEmailVerified = payload.EmailVerified,
						EmailVerificationCode = 0
					};
				await _usersRepository.AddAsync(newUser);
				await _context.SaveChangesAsync();

				TokenPayload tokenPayload = new(newUser.Id, newUser.Username);

				return new CreatedAtRouteResult(
					null,
					new AuthenticatedResponse(
						GenerateToken(TokenType.AccessToken, tokenPayload),
						GenerateToken(TokenType.RefreshToken, tokenPayload),
						newUser.ToUserDto()
					)
				);
			}
			// Login as existing user
			else
			{
				TokenPayload tokenPayload = new(existingUser.Id, existingUser.Username);

				return new CreatedAtRouteResult(
					null,
					new AuthenticatedResponse(
						GenerateToken(TokenType.AccessToken, tokenPayload),
						GenerateToken(TokenType.RefreshToken, tokenPayload),
						existingUser.ToUserDto()
					)
				);
			}
		}

		public string GenerateToken(TokenType type, TokenPayload payload)
		{
			var tokenHandler = new JwtSecurityTokenHandler();

			// Create token payload
			List<Claim> claims =
			[
				new("UId", payload.UId.ToString()),
				new("Username", payload.Username.ToString())
			];

			// Create signing credentials
			string jwtSecret = type == TokenType.AccessToken ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
			int tokenLifeSpan =
				type == TokenType.AccessToken ? ACCESS_TOKEN_LIFESPAN_DAYS : REFRESH_TOKEN_LIFESPAN_DAYS;
			byte[] jwtSecretKeyBytes = Encoding.UTF8.GetBytes(jwtSecret);
			SigningCredentials credentials =
				new(new SymmetricSecurityKey(jwtSecretKeyBytes), SecurityAlgorithms.HmacSha256Signature);

			// Create token
			SecurityTokenDescriptor tokenDescriptor =
				new()
				{
					Subject = new ClaimsIdentity(claims),
					Expires = DateTime.UtcNow.AddDays(tokenLifeSpan),
					SigningCredentials = credentials
				};
			SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

			return tokenHandler.WriteToken(token);
		}

		private async Task<ObjectResult?> ValidateRegistrationAsync(RegisterUserRequestDto requestDto)
		{
			var existingUsername = await _usersRepository.FirstOrDefaultAsync(user =>
				user.Username.Equals(requestDto.Username)
			);
			if (existingUsername != null)
			{
				return new BadRequestObjectResult(
					ErrorResponse.BadRequestResponse("Username already exists!")
				);
			}

			var existingEmail = await _usersRepository.FirstOrDefaultAsync(user =>
				user.Email.Equals(requestDto.Email)
			);
			if (existingEmail != null)
			{
				return new BadRequestObjectResult(
					ErrorResponse.BadRequestResponse("Email already exists!")
				);
			}

			return null;
		}

		private async Task<GoogleJsonWebSignature.Payload?> VerifyGoogleToken(string googleAuthCode)
		{
			GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow(
				new GoogleAuthorizationCodeFlow.Initializer
				{
					ClientSecrets = new ClientSecrets()
					{
						ClientId = OAUTH_CLIENT_ID,
						ClientSecret = OAUTH_CLIENT_SECRET,
					},
					Scopes = ["https://www.googleapis.com/auth/userinfo.profile"],
					IncludeGrantedScopes = true,
				}
			);

			//Exchange authorization code to get id_token and access_token
			TokenResponse token = await flow.ExchangeCodeForTokenAsync(
				"me",
				googleAuthCode,
				"postmessage",
				CancellationToken.None
			);

			var settings = new GoogleJsonWebSignature.ValidationSettings()
			{
				Audience = [OAUTH_CLIENT_ID]
			};

			return await GoogleJsonWebSignature.ValidateAsync(token.IdToken, settings);
		}

		private async Task BlacklistToken(string token, long ttl)
		{
			await _redisCache.SetStringAsync(
				token,
				"blacklisted",
				new DistributedCacheEntryOptions
				{
					SlidingExpiration = TimeSpan.FromSeconds(ttl > 0 ? ttl : 0)
				}
			);
		}

		public async Task<ActionResult<AuthenticatedResponse>> HandleAdminLoginAsync(
			LoginUserRequestDto requestDto
		)
		{
			User currentLoginUser = requestDto.ToUserFromLoginDto();
			var existingUser = await _usersRepository.FirstOrDefaultAsync(u =>
				u.Username.Equals(currentLoginUser.Username) && u.IsAdmin
			);

			if (
				existingUser != null
				&& BCrypt.Net.BCrypt.Verify(requestDto.Password, existingUser.Password)
			)
			{
				TokenPayload payload = new(existingUser.Id, existingUser.Username);

				return new OkObjectResult(
					new AuthenticatedResponse(
						GenerateToken(TokenType.AccessToken, payload),
						GenerateToken(TokenType.RefreshToken, payload),
						existingUser.ToUserDto()
					)
				);
			}
			else
			{
				return new BadRequestObjectResult(
					ErrorResponse.BadRequestResponse("Invalid username or password!")
				);
			}
		}
	}
}
