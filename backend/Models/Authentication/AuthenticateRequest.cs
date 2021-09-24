using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Ecommerce.Models.Authentication {
	public class AuthenticateRequest {
		[JsonRequired]
		public string Email { get; set; }
		[JsonRequired]
		public string Password { get; set; }

		public AuthenticateRequest(string email, string password) {
			Email = email;
			Password = password;
		}
	}
}
