using System;
using Microsoft.AspNetCore.Http;

namespace Ecommerce.Models.Authentication;

public class AccessToken {
	public string Token { get; set; }
	public CookieOptions CookieOptions { get; set; }
	public DateTime ExpirationDate { get; set; }

	public AccessToken(string token, CookieOptions cookieOptions, DateTime expirationDate) {
		Token = token;
		CookieOptions = cookieOptions;
		ExpirationDate = expirationDate;
	}
}