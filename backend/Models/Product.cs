using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models {
	public class Product {
		[Key]
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public double CostPrice { get; set; }
		public double SalePrice { get; set; }
		public int StockAmount { get; set; }
		public bool Status { get; set; }

		public Category Category { get; set; }

		public Product(int id, string name, string description, double costPrice, double salePrice, int stockAmount, bool status, Category category) {
			Id = id;
			Name = name;
			Description = description;
			CostPrice = costPrice;
			SalePrice = salePrice;
			StockAmount = stockAmount;
			Status = status;
			Category = category;
		}
	}
}
