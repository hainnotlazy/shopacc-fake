using server.Dtos.User;

namespace server.Dtos.Response
{
	public enum TokenType
	{
		AccessToken = 0,
		RefreshToken = 1
	}

	public class TokenPayload(int UId, string Username)
	{
		public int UId { get; set; } = UId;
		public string Username { get; set; } = Username;
	}

	public class AuthenticatedResponse(string AccessToken, string RefreshToken, UserDto? User)
	{
		public UserDto? User { get; set; } = User;
		public string AccessToken { get; set; } = AccessToken;
		public string RefreshToken { get; set; } = RefreshToken;
	}
}
