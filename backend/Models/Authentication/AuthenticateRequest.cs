using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Models.Authentication {
	public class AuthenticateRequest {
		[Required]
		public string Email { get; set; }
		[Required]
		public string Password { get; set; }
	}
}
