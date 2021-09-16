using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Product {
		[Key]
		public int Id { get; set; }
		[ForeignKey("Category")]
		public int CategoryId { get; set; }
		[Required]
		public string Name { get; set; }
		public string Description { get; set; }
		[Required]
		public double CostPrice { get; set; }
		[Required]
		public double SalePrice { get; set; }
		[Required]
		public int StockAmount { get; set; }
		[Required]
		public bool Status { get; set; }

		[Required]
		public Category Category { get; set; }

		public static Product FromDTO(ProductDTO product, Category category) => new() {
			Name = product.Name,
			Description = product.Description,
			CostPrice = product.CostPrice,
			SalePrice = product.SalePrice,
			StockAmount = product.StockAmount,
			Status = product.Status,
			CategoryId = product.CategoryId,
			Category = category,
		};
	}

	public class ProductDTO {
		[Required]
		public string Name { get; set; }
		public string Description { get; set; }
		public string Category { get; set; }
		[JsonRequired]
		public double CostPrice { get; set; }
		[JsonRequired]
		public double SalePrice { get; set; }
		[JsonRequired]
		public int StockAmount { get; set; }
		[JsonRequired]
		public bool Status { get; set; }

		[ForeignKey("Category")]
		[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
		public int CategoryId { get; set; }

		public static ProductDTO FromProduct(Product product) => new() {
			Name = product.Name,
			Description = product.Description,
			CostPrice = product.CostPrice,
			SalePrice = product.SalePrice,
			StockAmount = product.StockAmount,
			Status = product.Status,
			Category = product.Category.Name,
			CategoryId = product.CategoryId,
		};
	}
}
