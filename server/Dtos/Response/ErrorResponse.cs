namespace server.Dtos.Response
{
	public enum HttpErrorStatusCode
	{
		BadRequest = 400,
		Unauthorized = 401,
		Forbidden = 403,
		NotFound = 404,
		InternalServerError = 500
	}

	public struct HttpError
	{
		public string Error { get; set; }
	}

	public class ErrorResponse
	{
		private readonly Dictionary<HttpErrorStatusCode, string> ErrorTitles = new()
		{
			{ HttpErrorStatusCode.BadRequest, "Bad Request" },
			{ HttpErrorStatusCode.Unauthorized, "Unauthorized" },
			{ HttpErrorStatusCode.Forbidden, "Forbidden" },
			{ HttpErrorStatusCode.NotFound, "Not Found" },
			{ HttpErrorStatusCode.InternalServerError, "Internal Server Error" }
		};

		public HttpErrorStatusCode Status { get; set; }
		public string Title { get; set; }
		public HttpError Errors { get; set; }

		public ErrorResponse(HttpErrorStatusCode StatusCode, string Message)
		{
			Status = StatusCode;
			Title = ErrorTitles[StatusCode];
			Errors = new HttpError { Error = Message };
		}

		public static ErrorResponse BadRequestResponse(string Message)
		{
			return new ErrorResponse(HttpErrorStatusCode.BadRequest, Message);
		}

		public static ErrorResponse UnauthorizedResponse(string Message)
		{
			return new ErrorResponse(HttpErrorStatusCode.Unauthorized, Message);
		}

		public static ErrorResponse ForbiddenResponse(string Message)
		{
			return new ErrorResponse(HttpErrorStatusCode.Forbidden, Message);
		}

		public static ErrorResponse NotFoundResponse(string Message)
		{
			return new ErrorResponse(HttpErrorStatusCode.NotFound, Message);
		}

		public static ErrorResponse InternalServerErrorResponse(string Message)
		{
			return new ErrorResponse(HttpErrorStatusCode.InternalServerError, Message);
		}
	}
}
