using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class TransactionItem : BaseEntity {
		public int Quantity { get; set; }

		public int TransactionId { get; set; }
		public int ProductId { get; set; }
		public Product Product { get; set; }

		public TransactionItem(
			int quantity,
			int transactionId,
			int productId,
			int? id = null
		) : base(id) {
			Quantity = quantity;
			TransactionId = transactionId;
			ProductId = productId;
			Product = null!;
		}

		public TransactionItem(
			int quantity,
			int transactionId,
			int productId,
			Product product,
			int? id = null
		) : base(id) {
			Quantity = quantity;
			TransactionId = transactionId;
			ProductId = productId;
			Product = product;
		}

		public static TransactionItem FromDto(TransactionItemDTO item) => new(
			item.Product.Quantity,
			item.TransactionId,
			item.Product.Id,
			item.Id
		);
	}

	public class TransactionItemDTO {
		[JsonProperty(Required = Required.DisallowNull)]
		public int? Id { get; set; }

		public int TransactionId { get; set; }
		public TransactionProductDTO Product { get; set; }

		public TransactionItemDTO(int transactionId, TransactionProductDTO product) {
			TransactionId = transactionId;
			Product = product;
		}

		public static TransactionItemDTO FromEntity(TransactionItem item) => new(
			item.TransactionId,
			TransactionProductDTO.FromProduct(item.ProductId, item.Quantity, item.Product)
		);
	}

	public class TransactionProductDTO {
		public int Id { get; set; }
		public string Name { get; set; }
		public double UnitPrice { get; set; }
		public int Quantity { get; set; }

		public TransactionProductDTO(int id, string name, double unitPrice, int quantity) {
			Id = id;
			Name = name;
			UnitPrice = unitPrice;
			Quantity = quantity;
		}

		public static TransactionProductDTO FromProduct(int id, int quantity, Product product) => new(
			id,
			product.Name,
			product.CostPrice,
			quantity
		);
	}
}