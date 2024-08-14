using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Requests;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Util;
using Google.Apis.Util.Store;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Internal;
using Microsoft.IdentityModel.Tokens;
using server.DbContexts;
using server.Dtos.Response;
using server.Dtos.User;
using server.Mappers;
using server.Models;
using server.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using static System.Net.WebRequestMethods;

namespace server.Services
{
  public class AuthService : IAuthService
  {
		private readonly DefaultDbContext _context;
		private readonly DbSet<User> _usersRepository;
		private readonly IConfiguration _configuration;
		private readonly IMailService _mailService;

		private readonly string ACCESS_TOKEN_SECRET;
		private readonly string REFRESH_TOKEN_SECRET;
		private readonly int ACCESS_TOKEN_LIFESPAN_DAYS;
		private readonly int REFRESH_TOKEN_LIFESPAN_DAYS;

		private readonly string OAUTH_CLIENT_ID;
		private readonly string OAUTH_CLIENT_SECRET;
		public AuthService(DefaultDbContext context, IConfiguration configuration, IMailService mailService)
		{
			_context = context ??
				throw new ArgumentNullException(nameof(context));
			_usersRepository = _context.Users;
			_configuration = configuration;
			_mailService = mailService;

			ACCESS_TOKEN_SECRET = _configuration["JwtBearer:SecretKey"] ?? "access-token-very-secret-jwt-key";
			REFRESH_TOKEN_SECRET = _configuration["JwtBearer:RefreshTokenKey"] ?? "refresh-token-very-secret-jwt-key";
			ACCESS_TOKEN_LIFESPAN_DAYS = int.Parse(_configuration["JwtBearer:AccessTokenLifespanDays"] ?? 1.ToString());
			REFRESH_TOKEN_LIFESPAN_DAYS = int.Parse(_configuration["JwtBearer:RefreshTokenLifespanDays"] ?? 30.ToString());

			OAUTH_CLIENT_ID = _configuration["Authentication:Google:ClientId"] ?? "google-authentication-client-id";
			OAUTH_CLIENT_SECRET = _configuration["Authentication:Google:ClientSecret"] ?? "google-authentication-client-secret";
		}

		public async Task<ActionResult<AuthenticatedResponse>> LoginAsync(LoginUserRequestDto requestDto)
		{
			User loginUser = requestDto.ToUserFromLoginDto();
			var existingUser = await _usersRepository.FirstOrDefaultAsync(user =>
				user.Username.Equals(loginUser.Username) || user.Email.Equals(loginUser.Username)
			);

			if (existingUser != null && BCrypt.Net.BCrypt.Verify(requestDto.Password, existingUser.Password))
			{
				TokenPayload payload = new(existingUser.Id, existingUser.Username);

				return new OkObjectResult(new AuthenticatedResponse(
					GenerateToken(TokenType.AccessToken, payload),
					GenerateToken(TokenType.RefreshToken, payload),
					existingUser.ToUserDto()
				));
			}
			else
			{
				return new BadRequestObjectResult(ErrorResponse.BadRequestResponse("Invalid username or password!"));
			}
		}

		public async Task<ActionResult<AuthenticatedResponse>> RegisterAsync(RegisterUserRequestDto requestDto)
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
#pragma warning disable CS4014
			_mailService.SendVerificationMailAsync(registerUser.Email, registerUser.EmailVerificationCode.ToString());

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

		public string GenerateToken(TokenType type, TokenPayload payload)
		{
			var tokenHandler = new JwtSecurityTokenHandler();

			// Create token payload
			List<Claim> claims = [
				new("UId", payload.UId.ToString()),
				new("Username", payload.Username.ToString())
			];

			// Create signing credentials
			string jwtSecret = type == TokenType.AccessToken
				? ACCESS_TOKEN_SECRET
				: REFRESH_TOKEN_SECRET;
			int tokenLifeSpan = type == TokenType.AccessToken
				? ACCESS_TOKEN_LIFESPAN_DAYS
				: REFRESH_TOKEN_LIFESPAN_DAYS;
			byte[] jwtSecretKeyBytes = Encoding.UTF8.GetBytes(jwtSecret);
			SigningCredentials credentials = new(
				new SymmetricSecurityKey(jwtSecretKeyBytes),
				SecurityAlgorithms.HmacSha256Signature
			);

			// Create token
			SecurityTokenDescriptor tokenDescriptor = new()
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
			var existingUsername = await _usersRepository.FirstOrDefaultAsync(
				user => user.Username.Equals(requestDto.Username)
			);
			if (existingUsername != null)
			{
				return new BadRequestObjectResult(ErrorResponse.BadRequestResponse("Username already exists!"));
			}

			var existingEmail = await _usersRepository.FirstOrDefaultAsync(
				user => user.Email.Equals(requestDto.Email)
			);
			if (existingEmail != null)
			{
				return new BadRequestObjectResult(ErrorResponse.BadRequestResponse("Email already exists!"));
			}

			return null;
		}

		private async Task<GoogleJsonWebSignature.Payload?> VerifyGoogleToken(string googleAuthCode)
		{
			GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow(
				new GoogleAuthorizationCodeFlow.Initializer {
					ClientSecrets = new ClientSecrets()
					{
						ClientId = OAUTH_CLIENT_ID,
						ClientSecret = OAUTH_CLIENT_SECRET
					},
					Scopes = ["https://www.googleapis.com/auth/userinfo.profile"],
					IncludeGrantedScopes = true
				}
			);

			//Exchange authorization code to get id_token and access_token
			TokenResponse token = await flow.ExchangeCodeForTokenAsync("me", googleAuthCode, "postmessage", CancellationToken.None);
				
			var settings = new GoogleJsonWebSignature.ValidationSettings()
			{
				Audience = [OAUTH_CLIENT_ID]
			};

			return await GoogleJsonWebSignature.ValidateAsync(token.IdToken, settings);
		}

		public async Task<ActionResult<AuthenticatedResponse>> HandleGoogleLoginAsync(string googleTokenId)
		{
			var payload = await VerifyGoogleToken(googleTokenId);

			if(payload != null)
			{
				
				UserDto user = new()
				{
					Email = payload.Email,
					Username = payload.Name,
					Id = 1,
					IsEmailVerified = payload.EmailVerified
				};

				//Update or store this user to database

				TokenPayload tokenPayload = new (1, payload.GivenName);

				return new CreatedAtRouteResult(null, new AuthenticatedResponse(
					GenerateToken(TokenType.AccessToken, tokenPayload),
					GenerateToken(TokenType.RefreshToken, tokenPayload),
					user)
			);
			}
			else
			{
				return new BadRequestObjectResult(ErrorResponse.BadRequestResponse("Invalid google authorization code"));
			}
		}
  }
}
