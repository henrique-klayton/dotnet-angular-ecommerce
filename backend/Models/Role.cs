using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Role : BaseEntity {
		public string Name { get; set; }

		public virtual ICollection<User> Users { get; set; }

		public Role(int? id, string name) : base(id) {
			Name = name;
			Users = null!;
		}

		public Role(int? id, string name, ICollection<User> users) : base(id) {
			Name = name;
			Users = users;
		}

		public static implicit operator RoleDTO(Role user) => new(user.Id, user.Name);
	}

	public class RoleDTO {
		public int? Id { get; protected set; }
		[JsonRequired]
		public string Name { get; set; }

		public RoleDTO(int? id, string name) {
			Id = id;
			Name = name;
		}

		public static RoleDTO FromRole(Role role) => new(role.Id, role.Name);
	}

	public class RoleUsersDTO : RoleDTO {
		public IEnumerable<UserDTO> Users { get; set; }

		public RoleUsersDTO(int? id, string name, IEnumerable<UserDTO> users) : base(id, name) {
			Users = users;
		}

		public static new RoleUsersDTO FromRole(Role role) => new(
			role.Id,
			role.Name,
			// TODO May not work
			role.Users.Cast<UserDTO>()
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
