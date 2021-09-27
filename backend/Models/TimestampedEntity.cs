
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Models {
	public abstract class TimestampedEntity : BaseEntity {
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Required]
		public DateTime? Created { get; private set; }

		protected TimestampedEntity(int? id, DateTime? created) : base(id) {
			Created = created;
		}
	}
}