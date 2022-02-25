using System;
using Newtonsoft.Json;

namespace Ecommerce.Models.Authentication;

public class RefreshToken {
	[JsonRequired]
	public DateTime ExpirationDate { get; set; }

	public RefreshToken(DateTime expirationDate) {
		ExpirationDate = expirationDate;
	}
}