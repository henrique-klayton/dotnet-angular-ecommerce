using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Category : BaseEntity {
		public string Name { get; set; }

		public virtual ICollection<Product> Products { get; set; }

		public Category(int? id, string name) : base(id) {
			Name = name;
			Products = null!;
		}

		public Category(int? id, string name, ICollection<Product> products) : base(id) {
			Name = name;
			Products = products;
		}
	}

	public class CategoryDTO {
		[JsonProperty(Required = Required.DisallowNull)]
		public int? Id { get; protected set; }
		[JsonRequired]
		public string Name { get; set; }

		public CategoryDTO(int? id, string name) {
			Id = id;
			Name = name;
		}

		public static CategoryDTO FromCategory(Category category) => new(category.Id, category.Name);
	}

	public class CategoryProductsDTO : CategoryDTO {
		public IEnumerable<ProductDTO> Products { get; set; }

		public CategoryProductsDTO(int? id, string name, IEnumerable<ProductDTO> products)
		: base(id, name) {
			Products = products;
		}

		public static new CategoryProductsDTO FromCategory(Category category) => new(
			category.Id,
			category.Name,
			category.Products.Select(p => ProductDTO.FromProduct(p))
		);
	}

	public class CategoryPatchDTO {
		[JsonRequired]
		public string Name { get; set; }
		public IEnumerable<int?> Products { get; set; }

		public CategoryPatchDTO(string name, IEnumerable<int?> products) {
			Name = name;
			Products = products;
		}
	}
}
