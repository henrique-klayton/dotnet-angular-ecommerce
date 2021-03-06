using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Product : BaseEntity {
		public string Name { get; set; }
		public string? Description { get; set; }
		public double CostPrice { get; set; }
		public double SalePrice { get; set; }
		public int StockAmount { get; set; }
		public bool Status { get; set; }
		public string Image { get; set; }

		public int CategoryId { get; set; }
		public Category Category { get; set; }

		public Product(
			string name,
			double costPrice,
			double salePrice,
			int stockAmount,
			bool status,
			string image,
			int categoryId,
			int? id = null,
			string? description = null
		) : base(id) {
			Name = name;
			Description = description;
			CostPrice = costPrice;
			SalePrice = salePrice;
			StockAmount = stockAmount;
			Status = status;
			Image = image;
			Category = null!;
			CategoryId = categoryId;
		}

		public Product(
			string name,
			double costPrice,
			double salePrice,
			int stockAmount,
			bool status,
			string image,
			int categoryId,
			Category category,
			int? id = null,
			string? description = null
		) : base(id) {
			Name = name;
			Description = description;
			CostPrice = costPrice;
			SalePrice = salePrice;
			StockAmount = stockAmount;
			Status = status;
			Image = image;
			CategoryId = categoryId;
			Category = category;
		}

		public void Update(ProductUpdateDTO product, Category category) {
			Name = product.Name;
			Description = product.Description;
			CostPrice = product.CostPrice;
			SalePrice = product.SalePrice;
			StockAmount = product.StockAmount;
			Status = product.Status;
			Image = product.Image;
			CategoryId = product.CategoryId;
			Category = category;
		}

		public static Product FromDto(ProductUpdateDTO product, Category category, int? id = null) {
			return new(
				product.Name,
				product.CostPrice,
				product.SalePrice,
				product.StockAmount,
				product.Status,
				product.Image,
				product.CategoryId,
				category,
				id,
				product.Description
			);
		}
	}

	public class ProductUpdateDTO {
		[JsonRequired]
		public string Name { get; set; }
		public string? Description { get; set; }
		[JsonRequired]
		public double CostPrice { get; set; }
		[JsonRequired]
		public double SalePrice { get; set; }
		[JsonRequired]
		public int StockAmount { get; set; }
		[JsonRequired]
		public bool Status { get; set; }
		[JsonRequired]
		public string Image { get; set; }

		[JsonRequired]
		public int CategoryId { get; set; }

		public ProductUpdateDTO(
			string name,
			double costPrice,
			double salePrice,
			int stockAmount,
			bool status,
			string image,
			int categoryId,
			string? description = null
		) {
			Name = name;
			Description = description;
			CostPrice = costPrice;
			SalePrice = salePrice;
			StockAmount = stockAmount;
			Status = status;
			Image = image;
			CategoryId = categoryId;
		}

		public static ProductUpdateDTO FromProduct(Product product) => new(
			product.Name,
			product.CostPrice,
			product.SalePrice,
			product.StockAmount,
			product.Status,
			product.Image,
			product.CategoryId,
			product.Description
		);
	}

	public class ProductDTO : ProductUpdateDTO {
		public ProductDTO(
			int? id,
			string name,
			double costPrice,
			double salePrice,
			int stockAmount,
			bool status,
			string image,
			int categoryId,
			string category,
			string? description = null
		) : base(name, costPrice, salePrice, stockAmount, status, image, categoryId, description) {
			Id = id;
			Category = category;
		}

		[JsonProperty(Required = Required.DisallowNull)]
		public int? Id { get; private set; }
		[JsonProperty(Required = Required.DisallowNull)]
		public string Category { get; set; }

		public new static ProductDTO FromProduct(Product product) => new(
			product.Id,
			product.Name,
			product.CostPrice,
			product.SalePrice,
			product.StockAmount,
			product.Status,
			product.Image,
			product.CategoryId,
			product.Category.Name,
			product.Description
		);
	}
}
