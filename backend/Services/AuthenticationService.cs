using System;
using System.Linq;
using Ecommerce.Models;
using Ecommerce.Models.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Services {
	public interface IUserService {
		(AuthenticationResponse, AccessToken, RefreshTokenDto) Authenticate(User user);
		UserDTO Register(RegisterRequest model);
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

		public (AuthenticationResponse, AccessToken, RefreshTokenDto) Authenticate(User user) {
			var (accessToken, refreshToken) = _tokenService.GenerateTokens(user);

			var response = new AuthenticationResponse(
				UserDTO.FromUser(user, user.Role.Name),
				accessToken.ExpirationDate,
				refreshToken.ExpirationDate
			);

			return (response, accessToken, refreshToken);
		}

		public UserDTO Register(RegisterRequest model) {
			_passwordService.HashPassword(model.Password, out var passwordHash);

			var role = _dbContext.Roles.Single(r => r.Id == 3);
			var user = new User(
				name: model.Name,
				email: model.Email,
				passwordHash: passwordHash,
				roleId: 3,
				role: role
			);

			_dbContext.Users.Add(user);
			_dbContext.SaveChanges();

			return UserDTO.FromUser(user, role.Name);
		}
	}
}