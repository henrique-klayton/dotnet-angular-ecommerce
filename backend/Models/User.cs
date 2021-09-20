using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Models {
	public class User : TimestampedEntity {
		[ForeignKey("Role")]
		public int RoleId { get; set; }
		[Required]
		public string Name { get; set; }
		[EmailAddress]
		[Required]
		public string Email { get; set; }
		[Required]
		public string PasswordHash { get; set; }
		[Required]
		public string PasswordSalt { get; set; }
		public string Phone { get; set; }
		public DateTime BirthDate { get; set; }

		public static implicit operator UserDTO(User user) => new() {
			Name = user.Name,
			Email = user.Email,
			Phone = user.Phone,
			BirthDate = user.BirthDate,
			Created = user.Created,
			Role = user.RoleId,
		};
	}

	public class UserDTO {
		public int? Id { get; private set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public DateTime BirthDate { get; set; }
		public DateTime Created { get; set; }
		public int Role { get; set; }

		public static implicit operator User(UserDTO user) => new() {
			Name = user.Name,
			Email = user.Email,
			Phone = user.Phone,
			BirthDate = user.BirthDate,
			Created = user.Created,
			RoleId = user.Role,
		};
	}
}
