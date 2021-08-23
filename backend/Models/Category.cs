using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models {
	public class Category {

		[Key]
		public int Id { get; set; }
		public string Name { get; set; }

		public ICollection<Product> Product { get; set; }

		public Category(int id, string name, ICollection<Product> product) {
			Id = id;
			Name = name;
			Product = product;
		}
	}
}
