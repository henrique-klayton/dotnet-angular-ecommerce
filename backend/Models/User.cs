using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class User : TimestampedEntity {
		public string Name { get; set; }
		[EmailAddress]
		public string Email { get; set; }
		public string PasswordHash { get; set; }
		public string PasswordSalt { get; set; }
		public string? Phone { get; set; }
		public DateTime? BirthDate { get; set; }

		public int RoleId { get; set; }
		public Role Role { get; set; }

		public User(
			string name,
			string email,
			string passwordHash,
			string passwordSalt,
			int roleId,
			string? phone = null,
			DateTime? birthDate = null,
			int? id = null,
			DateTime? created = null
		) : base(id, created) {
			RoleId = roleId;
			Name = name;
			Email = email;
			PasswordHash = passwordHash;
			PasswordSalt = passwordSalt;
			Phone = phone;
			BirthDate = birthDate;
			Role = null!;
		}

		public User(
			string name,
			string email,
			string passwordHash,
			string passwordSalt,
			int roleId,
			Role role,
			string? phone = null,
			DateTime? birthDate = null,
			int? id = null,
			DateTime? created = null
		) : base(id, created) {
			RoleId = roleId;
			Name = name;
			Email = email;
			PasswordHash = passwordHash;
			PasswordSalt = passwordSalt;
			Phone = phone;
			BirthDate = birthDate;
			Role = role;
		}

		public static User FromDto(
			UserDTO user,
			string passwordHash,
			string passwordSalt,
			Role role
		) => new(
			user.Name,
			user.Email,
			passwordHash,
			passwordSalt,
			user.RoleId,
			role,
			user.Phone,
			user.BirthDate,
			user.Id,
			user.Created
		);
	}

	public class UserDTO {
		[JsonProperty(Required = Required.DisallowNull)]
		public int? Id { get; private set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string? Phone { get; set; }
		public DateTime? BirthDate { get; set; }
		public DateTime? Created { get; set; }
		public int RoleId { get; set; }
		public string Role { get; set; }

		public UserDTO(
			string name,
			string email,
			int roleId,
			string role,
			string? phone,
			DateTime? birthDate,
			int? id,
			DateTime? created
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
			user.Phone,
			user.BirthDate,
			user.Id,
			user.Created
		);
	}
}
