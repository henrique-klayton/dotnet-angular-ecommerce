using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Cart : TimestampedEntity {
		public int UserId { get; set; }

		public ICollection<Product> Products { get; set; }

		public Cart(int userId, int? id = null, DateTime? created = null) : base(id, created) {
			UserId = userId;
			Products = null!;
		}

		public Cart(
			int userId,
			ICollection<Product> products,
			int? id = null,
			DateTime? created = null
		) : base(id, created) {
			UserId = userId;
			Products = products;
		}

		public static Cart FromDto(CartDTO cart, ICollection<Product> products) => new(
			cart.UserId,
			products,
			cart.Id,
			cart.Created
		);
	}

	public class CartDTO {
		[JsonProperty(Required = Required.DisallowNull)]
		public int? Id { get; set; }
		[JsonProperty(Required = Required.DisallowNull)]
		public DateTime? Created { get; private set; }
		[JsonRequired]
		public int UserId { get; set; }

		public IEnumerable<ProductDTO> Products { get; set; }

		public CartDTO(
			int userId,
			IEnumerable<ProductDTO> products,
			int? id = null,
			DateTime? created = null
		) {
			Id = id;
			Created = created;
			UserId = userId;
			Products = products;
		}

		public static CartDTO FromEntity(Cart cart) => new(
			cart.UserId,
			cart.Products.Select(p => ProductDTO.FromProduct(p)),
			cart.Id,
			cart.Created
		);
	}
}