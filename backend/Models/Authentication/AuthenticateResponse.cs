using System.ComponentModel.DataAnnotations;
using Ecommerce.Services;

namespace Ecommerce.Models.Authentication {
	public class AuthenticateResponse {
		public UserDTO User { get; set; }
		public string Token { get; set; }

		public AuthenticateResponse(UserDTO user, string token) {
			User = user;
			Token = token;
		}
	}
}