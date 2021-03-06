using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ecommerce.Models.Authentication;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class User : TimestampedEntity {
		public string Name { get; set; }
		[EmailAddress]
		public string Email { get; set; }
		public string PasswordHash { get; set; }
		public string? Phone { get; set; }
		public DateTime? BirthDate { get; set; }

		public RefreshToken? RefreshToken { get; set; }

		public int RoleId { get; set; }
		public Role Role { get; set; }

		public User(
			string name,
			string email,
			string passwordHash,
			int roleId,
			int? id = null,
			DateTime? created = null,
			string? phone = null,
			DateTime? birthDate = null
		) : base(id, created) {
			RoleId = roleId;
			Name = name;
			Email = email;
			PasswordHash = passwordHash;
			Phone = phone;
			BirthDate = birthDate;
			RefreshToken = null!;
			Role = null!;
		}

		public User(
			string name,
			string email,
			string passwordHash,
			int roleId,
			RefreshToken refreshToken,
			int? id = null,
			DateTime? created = null,
			string? phone = null,
			DateTime? birthDate = null
		) : base(id, created) {
			RoleId = roleId;
			Name = name;
			Email = email;
			PasswordHash = passwordHash;
			Phone = phone;
			BirthDate = birthDate;
			RefreshToken = refreshToken;
			Role = null!;
		}

		public User(
			string name,
			string email,
			string passwordHash,
			int roleId,
			Role role,
			int? id = null,
			DateTime? created = null,
			string? phone = null,
			DateTime? birthDate = null
		) : base(id, created) {
			RoleId = roleId;
			Name = name;
			Email = email;
			PasswordHash = passwordHash;
			Phone = phone;
			BirthDate = birthDate;
			RefreshToken = null!;
			Role = role;
		}

		public User(
			string name,
			string email,
			string passwordHash,
			int roleId,
			Role role,
			RefreshToken refreshToken,
			int? id = null,
			DateTime? created = null,
			string? phone = null,
			DateTime? birthDate = null
		) : base(id, created) {
			RoleId = roleId;
			Name = name;
			Email = email;
			PasswordHash = passwordHash;
			Phone = phone;
			BirthDate = birthDate;
			RefreshToken = refreshToken;
			Role = role;
		}

		public static User FromDto(
			UserDTO user,
			string passwordHash,
			Role role
			// RefreshToken refreshToken
		) => new(
			user.Name,
			user.Email,
			passwordHash,
			user.RoleId,
			role,
			user.Id,
			user.Created,
			user.Phone,
			user.BirthDate
		);
	}

	public class UserDTO {
		[JsonProperty(Required = Required.DisallowNull)]
		public int? Id { get; private set; }

		[JsonRequired]
		public string Name { get; set; }

		[JsonRequired]
		public string Email { get; set; }

		public string? Phone { get; set; }
		public DateTime? BirthDate { get; set; }
		public DateTime? Created { get; set; }

		[JsonRequired]
		public int RoleId { get; set; }

		[JsonRequired]
		public string Role { get; set; }

		public UserDTO(
			string name,
			string email,
			int roleId,
			string role,
			int? id,
			DateTime? created,
			string? phone,
			DateTime? birthDate
		) {
			Id = id;
			Name = name;
			Email = email;
			Phone = phone;
			BirthDate = birthDate;
			Created = created;
			RoleId = roleId;
			Role = role;
		}

		public static UserDTO FromUser(User user, string roleName) => new(
			user.Name,
			user.Email,
			user.RoleId,
			roleName,
			user.Id,
			user.Created,
			user.Phone,
			user.BirthDate
		);
	}
}
