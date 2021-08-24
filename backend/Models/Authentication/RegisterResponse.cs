using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Models.Authentication {
	public class RegisterResponse {
		[Required]
		public string Message { get; set; }
	}
}
