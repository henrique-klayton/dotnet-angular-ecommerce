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
			CostPrice = product.CostPrice,
			SalePrice = product.SalePrice,
			StockAmount = product.StockAmount,
			Status = product.Status,
			CategoryId = product.CategoryId,
			Category = category,
		};
	}

	public class ProductDTO {
		public string Name { get; set; }
		public double CostPrice { get; set; }
		public double SalePrice { get; set; }
		public int StockAmount { get; set; }
		public bool Status { get; set; }
		public string Category { get; set; }

		[ForeignKey("Category")]
		[JsonIgnore]
		public int CategoryId { get; set; }

		public static ProductDTO FromProduct(Product product) => new() {
			Name = product.Name,
			CostPrice = product.CostPrice,
			SalePrice = product.SalePrice,
			StockAmount = product.StockAmount,
			Status = product.Status,
			Category = product.Category.Name,
			CategoryId = product.CategoryId,
		};
	}
}
