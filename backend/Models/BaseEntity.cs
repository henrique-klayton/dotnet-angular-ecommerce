using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Models {
	public abstract class BaseEntity {
		[Key]
		public int? Id { get; set; }

		protected BaseEntity(int? id) {
			Id = id;
		}
	}
}