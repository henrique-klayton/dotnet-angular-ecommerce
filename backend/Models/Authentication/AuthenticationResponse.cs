using Newtonsoft.Json;

namespace Ecommerce.Models.Authentication {
	public class AuthenticationResponse {
		[JsonRequired]
		public UserDTO User { get; set; }
		[JsonRequired]
		public RefreshToken RefreshToken { get; set; }

		public AuthenticationResponse(UserDTO user, RefreshToken refreshToken) {
			User = user;
			RefreshToken = refreshToken;
		}
	}
}