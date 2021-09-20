using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Models {
	public class Branch : TimestampedEntity {
		[Required]
		public string Name { get; set; }
		public string Phone { get; set; }
		// public DateTime BirthDate { get; set; }

		public static implicit operator BranchDTO(Branch branch) => new() {
			Id = branch.Id,
			Name = branch.Name,
			Phone = branch.Phone,
			// BirthDate = branch.BirthDate,
			Created = branch.Created,
		};
	}

	public class BranchDTO {
		public int? Id { get; private set; }
		public string Name { get; set; }
		public string Phone { get; set; }
		// public DateTime BirthDate { get; set; }
		public DateTime Created { get; set; }

		public static implicit operator Branch(BranchDTO branch) => new() {
			Id = branch.Id,
			Name = branch.Name,
			Phone = branch.Phone,
			// BirthDate = branch.BirthDate,
			Created = branch.Created,
		};
	}
}
