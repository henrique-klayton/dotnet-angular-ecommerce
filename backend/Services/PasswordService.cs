using BC = BCrypt.Net.BCrypt;

namespace Ecommerce.Services {
	public interface IPasswordService {
		void HashedPassword(string passwordInput, out string passwordHash, out string salt);
		bool ValidPassword(string passwordHash, string salt, string passwordInput);
	}

	public class PasswordService : IPasswordService {
		public void HashedPassword(string passwordInput, out string passwordHash, out string salt) {
			salt = BC.GenerateSalt();
			passwordHash = BC.HashPassword(passwordInput, salt);
		}

		public bool ValidPassword(string passwordHash, string salt, string passwordInput) {
			return BC.HashPassword(passwordInput, salt) == passwordHash;
		}
	}
}