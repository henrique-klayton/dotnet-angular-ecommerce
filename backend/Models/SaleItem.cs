using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class SaleItem : BaseEntity {
		public int Quantity { get; set; }

		public int SaleId { get; set; }
		public int ProductId { get; set; }
		public Product Product { get; set; }

		public SaleItem(
			int quantity,
			int saleId,
			int productId,
			int? id = null
		) : base(id) {
			Quantity = quantity;
			SaleId = saleId;
			ProductId = productId;
			Product = null!;
		}

		public SaleItem(
			int quantity,
			int saleId,
			int productId,
			Product product,
			int? id = null
		) : base(id) {
			Quantity = quantity;
			SaleId = saleId;
			ProductId = productId;
			Product = product;
		}

		public static SaleItem FromDto(SaleItemDTO item) => new(
			item.Product.Quantity,
			item.SaleId,
			item.Product.Id,
			item.Id
		);
	}

	public class SaleItemDTO {
		[JsonProperty(Required = Required.DisallowNull)]
		public int? Id { get; set; }

		[JsonRequired]
		public int SaleId { get; set; }
		[JsonRequired]
		public SaleProductDTO Product { get; set; }

		public SaleItemDTO(int saleId, SaleProductDTO product) {
			SaleId = saleId;
			Product = product;
		}

		public static SaleItemDTO FromEntity(SaleItem item) => new(
			item.SaleId,
			SaleProductDTO.FromProduct(item.ProductId, item.Quantity, item.Product)
		);
	}

	public class SaleProductDTO {
		[JsonProperty(Required = Required.DisallowNull)]
		public int Id { get; set; }
		[JsonRequired]
		public string Name { get; set; }
		[JsonRequired]
		public double UnitPrice { get; set; }
		[JsonRequired]
		public int Quantity { get; set; }

		public SaleProductDTO(int id, string name, double unitPrice, int quantity) {
			Id = id;
			Name = name;
			UnitPrice = unitPrice;
			Quantity = quantity;
		}

		public static SaleProductDTO FromProduct(int id, int quantity, Product product) => new(
			id,
			product.Name,
			product.CostPrice,
			quantity
		);
	}
}