using System;
using System.Linq;
using System.Net;
using Ecommerce.Models;
using Ecommerce.Models.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Services {
	public interface IUserService {
		(AuthenticationResponse, Cookie, CookieOptions)? Authenticate(AuthenticationRequest model);
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

		public (AuthenticationResponse, Cookie, CookieOptions)? Authenticate(AuthenticationRequest model) {
			var user = _dbContext.Users.Include(u => u.Role).SingleOrDefault(u => u.Email == model.Email);
			if (user == null) return null;

			if (!_passwordService.ValidatePassword(user.PasswordHash, model.Password))
				return null;

			var (token, maxAge) = _tokenService.GenerateJwtToken(user);
			var response = new AuthenticationResponse(
				UserDTO.FromUser(user, user.Role.Name),
				new RefreshToken(DateTime.UtcNow.Add(maxAge))
			);

			var cookieAccessToken = new Cookie("App-Access-Token", token);
			var cookieRefreshToken = new Cookie("App-Refresh-Token", Guid.NewGuid().ToString());
			var cookieOptions = new CookieOptions {
				SameSite = SameSiteMode.Strict,
				MaxAge = maxAge,
				HttpOnly = true
			};

			return (response, cookieAccessToken, cookieOptions);
		}

		public UserDTO Register(RegisterRequest model) {
			_passwordService.HashPassword(model.Password, out var passwordHash);

			var role = _dbContext.Roles.Single(r => r.Id == 3);
			var user = new User(
				model.Name,
				model.Email,
				passwordHash,
				3,
				role
			);

			_dbContext.Users.Add(user);
			_dbContext.SaveChanges();

			return UserDTO.FromUser(user, role.Name);
		}

		// TODO Método para criar um novo access token de um refresh token 
		public void AccessToken([FromBody] string refreshToken) { }
	}
}