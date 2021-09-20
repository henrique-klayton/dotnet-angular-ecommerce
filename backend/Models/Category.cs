using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Category : BaseEntity {
		[Required]
		public string Name { get; set; }

		public virtual ICollection<Product> Products { get; set; }
	}

	public class CategoryDTO {
		public int? Id { get; protected set; }
		[Required]
		public string Name { get; set; }

		public static CategoryDTO FromCategory(Category category) => new() {
			Id = category.Id,
			Name = category.Name,
		};
	}

	public class CategoryProductsDTO : CategoryDTO {
		public IEnumerable<ProductDTO> Products { get; set; }

		public static new CategoryProductsDTO FromCategory(Category category) => new() {
			Id = category.Id,
			Name = category.Name,
			Products = category.Products.Select(p => ProductDTO.FromProduct(p)),
		};
	}

	public class CategoryPatchDTO {
		public string Name { get; set; }
		public IEnumerable<int?> Products { get; set; }
	}
}
