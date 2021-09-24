using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Ecommerce.Models.Authentication {
	public class RegisterRequest {
		[JsonRequired]
		public string Name { get; set; }
		[JsonRequired]
		public string Email { get; set; }
		[JsonRequired]
		public string Password { get; set; }

		public RegisterRequest(string name, string email, string password) {
			Name = name;
			Email = email;
			Password = password;
		}
	}
}
