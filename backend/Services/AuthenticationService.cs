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
		private readonly IConfiguration _config;
		private readonly EcommerceDbContext _dbContext;
		private readonly IPasswordService _passwordService;

		public UserService(
			IConfiguration config,
			EcommerceDbContext dbContext,
			IPasswordService passwordService
		) {
			_config = config;
			_dbContext = dbContext;
			_passwordService = passwordService;
		}

		public AuthenticateResponse Authenticate(AuthenticateRequest model) {
			var user = _dbContext.Users.SingleOrDefault(u => u.Email == model.Email);
			if (user == null) return null;

			var token = GenerateJwtToken(user);
			return new AuthenticateResponse {
				User = user,
				Token = token
			};
		}

		public RegisterResponse Register(RegisterRequest model) {
			_passwordService.HashedPassword(model.Password, out var passwordHash, out var passwordSalt);

			//TODO Verificar se email existe

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

		private string GenerateJwtToken(User user) {
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(_config.GetValue<string>("JWTSecret"));

			var tokenDescriptor = new SecurityTokenDescriptor {
				Subject = new ClaimsIdentity(new[] {
					new Claim("Id", user.Id.ToString(), ClaimValueTypes.Integer),
					new Claim(ClaimTypes.Name, user.Name),
					new Claim(ClaimTypes.Email, user.Email),
				}),
				SigningCredentials = new SigningCredentials(
					new SymmetricSecurityKey(key),
					SecurityAlgorithms.HmacSha256Signature
				),
				Expires = DateTime.UtcNow.AddDays(7),
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}
	}
}