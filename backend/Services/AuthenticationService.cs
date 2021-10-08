using System.Linq;
using Ecommerce.Models;
using Ecommerce.Models.Authentication;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Services {
	public interface IUserService {
		AuthenticateResponse? Authenticate(AuthenticateRequest model);
		RegisterResponse Register(RegisterRequest model);
	}

	public class UserService : IUserService {
		private readonly EcommerceDbContext _dbContext;
		private readonly IPasswordService _passwordService;
		private readonly ITokenService _tokenService;

		public UserService(
			EcommerceDbContext dbContext,
			IPasswordService passwordService,
			ITokenService tokenService
		) {
			_dbContext = dbContext;
			_passwordService = passwordService;
			_tokenService = tokenService;
		}

		public AuthenticateResponse? Authenticate(AuthenticateRequest model) {
			var user = _dbContext.Users.Include(u => u.Role).SingleOrDefault(u => u.Email == model.Email);
			if (user == null) return null;

			if (!_passwordService.ValidPassword(user.PasswordHash, user.PasswordSalt, model.Password))
				return null;

			var token = _tokenService.GenerateJwtToken(user);
			return new AuthenticateResponse(
				UserDTO.FromUser(user, user.Role.Name),
				token
			);
		}

		public RegisterResponse Register(RegisterRequest model) {
			_passwordService.HashedPassword(model.Password, out var passwordHash, out var passwordSalt);

			// FIXME Cadastrar roles no banco
			_dbContext.Users.Add(new User(
				model.Name,
				model.Email,
				passwordHash,
				passwordSalt,
				roleId: 0,
				_dbContext.Roles.Single(r => r.Id == 0)
			));
			_dbContext.SaveChanges();

			return new RegisterResponse("Usuário cadastrado com sucesso!");
		}
	}
}