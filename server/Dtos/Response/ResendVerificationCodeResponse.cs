using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Response
{
	public class ResendVerificationCodeResponse
	{
		public DateTime NextEmailVerificationTime { get; set; }
	}
}
