using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Ecommerce.Models.Authentication;

public interface IRefreshToken {
	public string Token { get; set; }
	public DateTime ExpirationDate { get; set; }
}

public class RefreshToken : IRefreshToken {
	[Key]
	[ForeignKey("User")]
	public int Id { get; set; }
	public string Token { get; set; }
	public DateTime ExpirationDate { get; set; }

	public RefreshToken(string token, DateTime expirationDate, int id = 0) {
		Id = id;
		Token = token;
		ExpirationDate = expirationDate;
	}
}

public class RefreshTokenDto : IRefreshToken {
	public string Token { get; set; }
	public CookieOptions CookieOptions { get; set; }
	public DateTime ExpirationDate { get; set; }

	public RefreshTokenDto(string token, CookieOptions cookieOptions, DateTime expirationDate) {
		Token = token;
		CookieOptions = cookieOptions;
		ExpirationDate = expirationDate;
	}
}