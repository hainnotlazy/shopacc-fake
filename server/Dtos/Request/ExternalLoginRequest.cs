namespace server.Dtos.Request
{
  public class ExternalLoginRequest
  {
		public required string LoginProvider { get; set; }
		public required string AuthorizationCode { get; set; }
  }
}
