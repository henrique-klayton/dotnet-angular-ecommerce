using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Models.Authentication {
	public class AuthenticateRequest {
		public string Email { get; set; }
		public string Password { get; set; }

		public AuthenticateRequest(string email, string password) {
			Email = email;
			Password = password;
		}
	}
}
