using System.ComponentModel.DataAnnotations;
using Ecommerce.Services;

namespace Ecommerce.Models.Authentication {
	public class AuthenticateResponse {
		[Required]
		public UserDTO User { get; set; }
		[Required]
		public string Token { get; set; }
	}
}