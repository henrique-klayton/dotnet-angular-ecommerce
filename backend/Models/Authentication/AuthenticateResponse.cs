using Newtonsoft.Json;

namespace Ecommerce.Models.Authentication {
	public class AuthenticateResponse {
		[JsonRequired]
		public UserDTO User { get; set; }
		[JsonRequired]
		public RefreshToken RefreshToken { get; set; }

		public AuthenticateResponse(UserDTO user, RefreshToken refreshToken) {
			User = user;
			RefreshToken = refreshToken;
		}
	}
}