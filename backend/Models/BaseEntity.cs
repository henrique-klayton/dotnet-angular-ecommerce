using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Models {
	public abstract class BaseEntity {
		[Key]
		public int? Id { get; set; }
	}
}