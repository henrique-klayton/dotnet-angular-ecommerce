using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Product : BaseEntity {
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

		public void Update(ProductUpdateDTO product, Category category) {
			Name = product.Name;
			Description = product.Description;
			CostPrice = product.CostPrice;
			SalePrice = product.SalePrice;
			StockAmount = product.StockAmount;
			Status = product.Status;
			CategoryId = product.CategoryId;
			Category = category;
		}

		public static Product FromDto(ProductUpdateDTO product, Category category, int? id = null) {
			return new() {
				Id = id,
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
	}

	public class ProductUpdateDTO {
		[Required]
		public string Name { get; set; }
		public string Description { get; set; }
		[JsonRequired]
		public double CostPrice { get; set; }
		[JsonRequired]
		public double SalePrice { get; set; }
		[JsonRequired]
		public int StockAmount { get; set; }
		[JsonRequired]
		public bool Status { get; set; }

		[JsonRequired]
		public int CategoryId { get; set; }

		public static ProductUpdateDTO FromProduct(Product product) => new() {
			Name = product.Name,
			Description = product.Description,
			CostPrice = product.CostPrice,
			SalePrice = product.SalePrice,
			StockAmount = product.StockAmount,
			Status = product.Status,
			CategoryId = product.CategoryId,
		};
	}

	public class ProductDTO : ProductUpdateDTO {
		public int? Id { get; private set; }
		[JsonRequired]
		public string Category { get; set; }

		public new static ProductDTO FromProduct(Product product) => new() {
			Id = product.Id,
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
