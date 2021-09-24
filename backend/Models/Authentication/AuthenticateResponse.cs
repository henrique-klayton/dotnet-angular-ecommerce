using System.ComponentModel.DataAnnotations;
using Ecommerce.Services;
using Newtonsoft.Json;

namespace Ecommerce.Models.Authentication {
	public class AuthenticateResponse {
		[JsonRequired]
		public UserDTO User { get; set; }
		[JsonRequired]
		public string Token { get; set; }

		public AuthenticateResponse(UserDTO user, string token) {
			User = user;
			Token = token;
		}
	}
}