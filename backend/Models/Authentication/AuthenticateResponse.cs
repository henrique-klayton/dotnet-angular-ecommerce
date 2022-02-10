using Newtonsoft.Json;

namespace Ecommerce.Models.Authentication {
	public class AuthenticateResponse {
		[JsonRequired]
		public UserDTO User { get; set; }

		public AuthenticateResponse(UserDTO user) {
			User = user;
		}
	}
}