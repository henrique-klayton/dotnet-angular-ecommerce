using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Role : BaseEntity {
		[Required]
		public string Name { get; set; }

		public static implicit operator RoleDTO(Role user) => new() {
			Name = user.Name,
		};
	}

	public class RoleDTO {
		public int? Id { get; private set; }
		[JsonRequired]
		public string Name { get; set; }

		public static implicit operator Role(RoleDTO user) => new() {
			Name = user.Name,
		};
	}
}
