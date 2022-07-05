using System;
using Newtonsoft.Json;

namespace Ecommerce.Models.Authentication {
	public class AuthenticationResponse {
		[JsonRequired]
		public UserDTO User { get; set; }
		[JsonRequired]
		public DateTime AccessTokenExpiration { get; set; }
		[JsonRequired]
		public DateTime RefreshTokenExpiration { get; set; }

		public AuthenticationResponse(UserDTO user, DateTime accessTokenExpiration, DateTime refreshTokenExpiration) {
			User = user;
			AccessTokenExpiration = accessTokenExpiration;
			RefreshTokenExpiration = refreshTokenExpiration;
		}
	}
}