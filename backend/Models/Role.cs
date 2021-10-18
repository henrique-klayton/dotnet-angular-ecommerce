using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Role : BaseEntity {
		public string Name { get; set; }

		public virtual ICollection<User> Users { get; set; }

		public Role(string name, int? id = null) : base(id) {
			Name = name;
			Users = null!;
		}

		public Role(string name, ICollection<User> users, int? id = null) : base(id) {
			Name = name;
			Users = users;
		}

		public static Role FromDto(RoleDTO role, ICollection<User> users) => new(
			role.Name,
			users,
			role.Id
		);
	}

	public class RoleDTO {
		[JsonProperty(Required = Required.DisallowNull)]
		public int? Id { get; protected set; }
		[JsonRequired]
		public string Name { get; set; }

		public RoleDTO(string name, int? id = null) {
			Id = id;
			Name = name;
		}

		public static RoleDTO FromRole(Role role) => new(role.Name, role.Id);
	}

	public class RoleUsersDTO : RoleDTO {
		[JsonRequired]
		public IEnumerable<UserDTO> Users { get; set; }

		public RoleUsersDTO(string name, IEnumerable<UserDTO> users, int? id = null) : base(name, id) {
			Users = users;
		}

		public static new RoleUsersDTO FromRole(Role role) => new(
			role.Name,
			// TODO May not work
			role.Users.Cast<UserDTO>(),
			role.Id
		);
	}

	public class RolePatchDTO {
		public string Name { get; set; }

		public IEnumerable<int?> Users { get; set; }

		public RolePatchDTO(string name, IEnumerable<int?> users) {
			Name = name;
			Users = users;
		}
	}
}
