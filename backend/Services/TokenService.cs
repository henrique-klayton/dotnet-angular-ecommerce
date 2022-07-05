using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Ecommerce.Models;
using Ecommerce.Models.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace Ecommerce.Services {
	public interface ITokenService {
		AccessToken GenerateJwtToken(User user);
		RefreshTokenDto GenerateRefreshToken(User user);
		(AccessToken, RefreshTokenDto) GenerateTokens(User user);
		bool ValidateRefreshToken(IRefreshToken token);
	}
	public class TokenService : ITokenService {
		private const int DEVELOPMENT_TOKEN_MINUTES = 420;
		private const int PRODUCTION_TOKEN_MINUTES = 30;

		private readonly IConfiguration _config;
		private readonly EcommerceDbContext _dbContext;
		private readonly IWebHostEnvironment _env;

		public TokenService(
			IConfiguration config,
			EcommerceDbContext dbContext,
			IWebHostEnvironment env
		) {
			_config = config;
			_dbContext = dbContext;
			_env = env;
		}

		public AccessToken GenerateJwtToken(User user) {
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(_config["JWTSecret"]);
			var expires = _env.IsProduction()
					? DateTime.UtcNow.AddMinutes(PRODUCTION_TOKEN_MINUTES)
					: DateTime.UtcNow.AddMinutes(DEVELOPMENT_TOKEN_MINUTES);

			var tokenDescriptor = new SecurityTokenDescriptor {
				Subject = new ClaimsIdentity(new[] {
					new Claim("id", user.Id.ToString()!, ClaimValueTypes.Integer),
					new Claim(ClaimTypes.Name, user.Name),
					new Claim(ClaimTypes.Email, user.Email),
				}),
				SigningCredentials = new SigningCredentials(
					new SymmetricSecurityKey(key),
					SecurityAlgorithms.HmacSha256Signature
				),
				Expires = expires,
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			var cookieOptions = new CookieOptions {
				SameSite = SameSiteMode.Strict,
				MaxAge = expires - DateTime.UtcNow,
				HttpOnly = true,
			};

			return new AccessToken(tokenHandler.WriteToken(token), cookieOptions, expires);
		}

		public RefreshTokenDto GenerateRefreshToken(User user) {
			var token = Guid.NewGuid().ToString();
			var expires = DateTime.UtcNow.AddHours(4);

			var cookieOptions = new CookieOptions {
				SameSite = SameSiteMode.Strict,
				MaxAge = expires - DateTime.UtcNow,
				HttpOnly = true,
			};

			SaveRefreshToken(user, new RefreshToken(token, expires));
			return new RefreshTokenDto(token, cookieOptions, expires);
		}

		public bool ValidateRefreshToken(IRefreshToken token) => token.ExpirationDate.CompareTo(DateTime.Now) <= 0;
		public (AccessToken, RefreshTokenDto) GenerateTokens(User user) => (GenerateJwtToken(user), GenerateRefreshToken(user));

		private void SaveRefreshToken(User user, RefreshToken token) {
			if (user.RefreshToken != null)
				_dbContext.RefreshTokens.Remove(user.RefreshToken);

			_dbContext.RefreshTokens.Add(token);
			user.RefreshToken = token;
			_dbContext.Users.Update(user);
		}
	}
}