using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models {
	public class User {
		[Key]
		public int Id { get; set; }
		public string Name { get; set; }
	
		[EmailAddress]
		public string Email { get; set; }
		public string PasswordHash { get; set; }
		public string PasswordSalt { get; set; }
		public string Phone { get; set; }
		public DateTime BirthDate { get; set; }
		public string Role { get; set; }

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public DateTime Created { get; set; }

		public User(int id, string name, string email, string passwordHash, string passwordSalt, string phone, DateTime birthDate, string role) {
			Id = id;
			Name = name;
			Email = email;
			PasswordHash = passwordHash;
			PasswordSalt = passwordSalt;
			Phone = phone;
			BirthDate = birthDate;
			Role = role;
		}
	}
}
