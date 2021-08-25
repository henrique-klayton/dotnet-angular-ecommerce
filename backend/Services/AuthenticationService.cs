using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Ecommerce.Models;
using Microsoft.Extensions.Configuration;
using Ecommerce.Models.Authentication;
using Microsoft.AspNetCore.Identity;

namespace Ecommerce.Services {
	public interface IUserService {
		AuthenticateResponse Authenticate(AuthenticateRequest model);
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

		public AuthenticateResponse Authenticate(AuthenticateRequest model) {
			var user = _dbContext.Users.SingleOrDefault(u => u.Email == model.Email);
			if (user == null) return null;

			if (!_passwordService.ValidPassword(user.PasswordHash, user.PasswordSalt, model.Password))
				return null;

			var token = _tokenService.GenerateJwtToken(user);
			return new AuthenticateResponse {
				User = new UserDTO(user),
				Token = token,
			};
		}

		public RegisterResponse Register(RegisterRequest model) {
			_passwordService.HashedPassword(model.Password, out var passwordHash, out var passwordSalt);

			//TODO Verificar se email já está cadastrado

			_dbContext.Users.Add(new User {
				Name = model.Name,
				Email = model.Email,
				PasswordHash = passwordHash,
				PasswordSalt = passwordSalt,
				Role = 0,
			});
			_dbContext.SaveChanges();

			return new RegisterResponse { Message = "Usuário cadastrado com sucesso!" };
		}
	}
}