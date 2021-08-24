using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Models.Authentication {
	public class AuthenticateResponse {
		[Required]
		public User User { get; set; }
		[Required]
		public string Token { get; set; }
	}
}