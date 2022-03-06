using BC = BCrypt.Net.BCrypt;

namespace Ecommerce.Services {
	public interface IPasswordService {
		void HashPassword(string passwordInput, out string passwordHash);
		bool ValidatePassword(string passwordHash, string passwordInput);
	}

	public class PasswordService : IPasswordService {
		public void HashPassword(string passwordInput, out string passwordHash) {
			passwordHash = BC.EnhancedHashPassword(passwordInput);
		}

		public bool ValidatePassword(string passwordHash, string passwordInput) {
			return BC.EnhancedVerify(passwordInput, passwordHash);
		}
	}
}