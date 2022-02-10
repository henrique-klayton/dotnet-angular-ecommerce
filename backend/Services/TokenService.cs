using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Ecommerce.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace Ecommerce.Services {
	public interface ITokenService {
		(string, TimeSpan) GenerateJwtToken(User user);
	}
	public class TokenService : ITokenService {
		private readonly IConfiguration _config;
		private readonly IWebHostEnvironment _env;

		public TokenService(IConfiguration config, IWebHostEnvironment env) {
			_config = config;
			_env = env;
		}

		public (string, TimeSpan) GenerateJwtToken(User user) {
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(_config["JWTSecret"]);
			var expires = _env.IsDevelopment()
					? DateTime.UtcNow.AddDays(7)
					: DateTime.UtcNow.AddMinutes(30);
			var maxAge = expires - DateTime.UtcNow;

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
			return (tokenHandler.WriteToken(token), maxAge);
		}
	}
}