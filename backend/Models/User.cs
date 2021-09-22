using System;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Models {
	public class User : TimestampedEntity {
		public string Name { get; set; }
		[EmailAddress]
		public string Email { get; set; }
		public string PasswordHash { get; set; }
		public string PasswordSalt { get; set; }
		public string? Phone { get; set; }
		public DateTime? BirthDate { get; set; }

		public int Role { get; set; }

		public User(
			string name,
			string email,
			string passwordHash,
			string passwordSalt,
			int role,
			int? id = null,
			string? phone = null,
			DateTime? birthDate = null,
			DateTime? created = null
		) : base(id, created) {
			Role = role;
			Name = name;
			Email = email;
			PasswordHash = passwordHash;
			PasswordSalt = passwordSalt;
			Phone = phone;
			BirthDate = birthDate;
		}

		public static User FromDto(
			UserDTO user,
			string passwordHash,
			string passwordSalt
		) => new(
			user.Name,
			user.Email,
			passwordHash,
			passwordSalt,
			user.Role,
			user.Id,
			user.Phone,
			user.BirthDate,
			user.Created
		);
	}

	public class UserDTO {
		public int? Id { get; private set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string? Phone { get; set; }
		public DateTime? BirthDate { get; set; }
		public DateTime? Created { get; set; }
		public int Role { get; set; }

		public UserDTO(
			string name,
			string email,
			int role,
			int? id,
			string? phone,
			DateTime? birthDate,
			DateTime? created
		) {
			Id = id;
			Name = name;
			Email = email;
			Phone = phone;
			BirthDate = birthDate;
			Created = created;
			Role = role;
		}

		public static UserDTO FromUser(User user) => new(
			user.Name,
			user.Email,
			user.Role,
			user.Id,
			user.Phone,
			user.BirthDate,
			user.Created
		);
	}
}
