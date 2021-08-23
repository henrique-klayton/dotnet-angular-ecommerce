using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models {
	public class Product {
		[Key]
		public int Id { get; set; }
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
	}
}
