using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Ecommerce.Models {
	public class Transaction : TimestampedEntity {
		public double TotalPrice { get; set; }

		public virtual ICollection<TransactionItem> Items { get; set; }

		public Transaction(double totalPrice, int? id = null, DateTime? created = null) : base(id, created) {
			TotalPrice = totalPrice;
			Items = null!;
		}

		public Transaction(
			double totalPrice,
			ICollection<TransactionItem> items,
			int? id = null,
			DateTime? created = null
		) : base(id, created) {
			TotalPrice = totalPrice;
			Items = items;
		}

		public static Transaction FromDto(
			TransactionDTO transaction,
			ICollection<TransactionItem> items
		) => new(
			transaction.TotalPrice,
			items,
			transaction.Id
		);
	}

	public class TransactionDTO {
		[JsonProperty(Required = Required.DisallowNull)]
		public int? Id { get; set; }
		public DateTime? Created { get; set; }
		public double TotalPrice { get; set; }

		public IEnumerable<TransactionItemDTO> Items { get; set; }

		public TransactionDTO(
			double totalPrice,
			IEnumerable<TransactionItemDTO> items,
			int? id = null,
			DateTime? created = null
		) {
			Id = id;
			TotalPrice = totalPrice;
			Created = created;
			Items = items;
		}

		public static TransactionDTO FromEntity(Transaction transaction) => new(
			transaction.TotalPrice,
			transaction.Items.Select(i => TransactionItemDTO.FromEntity(i)),
			transaction.Id
		);
	}
}