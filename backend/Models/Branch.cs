using System;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Models {
	public class Branch : TimestampedEntity {
		[Required]
		public string Name { get; set; }
		public string Phone { get; set; }
		// public DateTime BirthDate { get; set; }

		public Branch(int? id, DateTime? created, string name, string phone) : base(id, created) {
			Name = name;
			Phone = phone;
		}

		public static Branch FromDto(BranchDTO branch) => new(
			branch.Id,
			branch.Created,
			branch.Phone,
			branch.Name
		);
	}

	public class BranchDTO {
		public int? Id { get; private set; }
		public string Name { get; set; }
		public string Phone { get; set; }
		// public DateTime BirthDate { get; set; }
		public DateTime? Created { get; set; }

		public BranchDTO(int? id, string name, string phone, DateTime? created) {
			Id = id;
			Name = name;
			Phone = phone;
			Created = created;
		}

		public static BranchDTO FromBranch(Branch branch) => new(
			branch.Id,
			branch.Name,
			branch.Phone,
			// branch.BirthDate,
			branch.Created
		);
	}
}
