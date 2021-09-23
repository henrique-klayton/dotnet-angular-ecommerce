using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Models.Authentication {
	public class RegisterRequest {
		public string Name { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }

		public RegisterRequest(string name, string email, string password) {
			Name = name;
			Email = email;
			Password = password;
		}
	}
}
