using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models {
	public class User {
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[EmailAddress]
		public string Email { get; set; }
		[Required]
		public string PasswordHash { get; set; }
		[Required]
		public string PasswordSalt { get; set; }
		[Required]
		public string Phone { get; set; }
		[Required]
		public DateTime BirthDate { get; set; }
		[Required]
		public string Role { get; set; }

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public DateTime Created { get; set; }
	}
}
