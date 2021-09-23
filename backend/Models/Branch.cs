using System;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Branch : TimestampedEntity {
		[ForeignKey("Address")]
		public int AddressId { get; set; }
		public string Name { get; set; }
		public string Phone { get; set; }

		public Address Address { get; set; }

		public Branch(
			string name,
			string phone,
			int addressId,
			int? id,
			DateTime? created
		) : base(id, created) {
			Name = name;
			Phone = phone;
			Address = null!;
			AddressId = addressId;
		}

		public Branch(
			string name,
			string phone,
			int addressId,
			Address address,
			int? id,
			DateTime? created
		) : base(id, created) {
			Name = name;
			Phone = phone;
			Address = address;
			AddressId = addressId;
		}

		public static Branch FromDto(BranchDTO branch, Address address) => new(
			branch.Name,
			branch.Phone,
			branch.AddressId,
			address,
			branch.Id,
			branch.Created
		);
	}

	public class BranchDTO {
		public int? Id { get; private set; }
		[JsonRequired]
		public int AddressId { get; set; }
		[JsonRequired]
		public string Name { get; set; }
		[JsonRequired]
		public string Phone { get; set; }
		[JsonRequired]
		public AddressDTO Address { get; set; }

		public DateTime? Created { get; set; }

		public BranchDTO(
			string name,
			string phone,
			int addressId,
			AddressDTO address,
			int? id,
			DateTime? created
		) {
			Id = id;
			AddressId = addressId;
			Name = name;
			Phone = phone;
			Address = address;
			Created = created;
		}

		public static BranchDTO FromBranch(Branch branch) => new(
			branch.Name,
			branch.Phone,
			branch.AddressId,
			branch.Address,
			branch.Id,
			branch.Created
		);
	}
}
