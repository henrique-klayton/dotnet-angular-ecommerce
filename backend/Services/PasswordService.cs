using BC = BCrypt.Net.BCrypt;

namespace Ecommerce.Services {
	public interface IPasswordService {
		void HashedPassword(string passwordInput, out string passwordHash);
		bool ValidPassword(string passwordHash, string passwordInput);
	}

	public class PasswordService : IPasswordService {
		public void HashedPassword(string passwordInput, out string passwordHash) {
			passwordHash = BC.EnhancedHashPassword(passwordInput);
		}

		public bool ValidPassword(string passwordHash, string passwordInput) {
			return BC.EnhancedVerify(passwordInput, passwordHash);
		}
	}
}