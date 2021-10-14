using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Sale : TimestampedEntity {
		public double TotalPrice { get; set; }

		public virtual ICollection<SaleItem> Items { get; set; }

		public Sale(double totalPrice, int? id = null, DateTime? created = null) : base(id, created) {
			TotalPrice = totalPrice;
			Items = null!;
		}

		public Sale(
			double totalPrice,
			ICollection<SaleItem> items,
			int? id = null,
			DateTime? created = null
		) : base(id, created) {
			TotalPrice = totalPrice;
			Items = items;
		}

		public static Sale FromDto(
			SaleDTO sale,
			ICollection<SaleItem> items
		) => new(
			sale.TotalPrice,
			items,
			sale.Id,
			sale.Created
		);
	}

	public class SaleDTO {
		[JsonProperty(Required = Required.DisallowNull)]
		public int? Id { get; set; }
		public DateTime? Created { get; set; }
		public double TotalPrice { get; set; }

		public IEnumerable<SaleItemDTO> Items { get; set; }

		public SaleDTO(
			double totalPrice,
			IEnumerable<SaleItemDTO> items,
			int? id = null,
			DateTime? created = null
		) {
			Id = id;
			Created = created;
			TotalPrice = totalPrice;
			Items = items;
		}

		public static SaleDTO FromEntity(Sale sale) => new(
			sale.TotalPrice,
			sale.Items.Select(i => SaleItemDTO.FromEntity(i)),
			sale.Id,
			sale.Created
		);
	}
}