using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models {
	public class Category {

		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }

		[Required]
		public ICollection<Product> Product { get; set; }
	}
}
