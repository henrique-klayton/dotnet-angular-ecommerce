using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Models.Authentication {
	public class RegisterResponse {
		public string Message { get; set; }

		public RegisterResponse(string message) {
			Message = message;
		}
	}
}
