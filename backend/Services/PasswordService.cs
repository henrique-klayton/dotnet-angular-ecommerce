using BC = BCrypt.Net.BCrypt;

namespace Ecommerce.Services {
	public interface IPasswordService {
		void HashPassword(string passwordInput, out string passwordHash, out string salt);
		bool ValidatePassword(string passwordHash, string salt, string passwordInput);
	}

	public class PasswordService : IPasswordService {
		public void HashPassword(string passwordInput, out string passwordHash, out string salt) {
			salt = BC.GenerateSalt();
			passwordHash = BC.HashPassword(passwordInput, salt);
		}

		public bool ValidatePassword(string passwordHash, string salt, string passwordInput) {
			return BC.HashPassword(passwordInput, salt) == passwordHash;
		}
	}
}