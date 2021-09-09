using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Models {
	public class Category {
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }

		public ICollection<Product> Products { get; set; }

		public static implicit operator CategoryDTO(Category category) => new() {
			Name = category.Name,
		};

		public void Update(CategoryDTO model) {
			// TODO Validate and throw errors
			Name = model.Name;
		}
	}

	public class CategoryDTO {
		[Required]
		public string Name { get; set; }
	}
}
