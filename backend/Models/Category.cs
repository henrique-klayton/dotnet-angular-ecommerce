using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Category : BaseEntity {
		public string Name { get; set; }

		public virtual ICollection<Product> Products { get; set; }

		public Category(string name, int? id = null) : base(id) {
			Name = name;
			Products = null!;
		}

		public Category(string name, ICollection<Product> products, int? id = null) : base(id) {
			Name = name;
			Products = products;
		}
	}

	public class CategoryDTO {
		[JsonProperty(Required = Required.DisallowNull)]
		public int? Id { get; protected set; }
		[JsonRequired]
		public string Name { get; set; }

		public CategoryDTO(string name, int? id = null) {
			Id = id;
			Name = name;
		}

		public static CategoryDTO FromCategory(Category category) => new(category.Name, category.Id);
	}

	public class CategoryProductsDTO : CategoryDTO {
		public IEnumerable<ProductDTO> Products { get; set; }

		public CategoryProductsDTO(string name, IEnumerable<ProductDTO> products, int? id = null)
		: base(name, id) {
			Products = products;
		}

		public static new CategoryProductsDTO FromCategory(Category category) => new(
			category.Name,
			category.Products.Select(p => ProductDTO.FromProduct(p)),
			category.Id
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
