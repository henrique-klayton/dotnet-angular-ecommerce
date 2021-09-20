
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Models {
	public abstract class TimestampedEntity : BaseEntity {
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public DateTime Created { get; set; }
	}
}