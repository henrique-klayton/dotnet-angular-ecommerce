using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models {
	public class Employee : User {

		public Employee(
			int id,
			string name,
			string email,
			string passwordHash,
			string passwordSalt,
			string phone,
			DateTime birthDate,
			string role
		) : base(id, name, email, passwordHash, passwordSalt, phone, birthDate, role) {
		}
	}
}
