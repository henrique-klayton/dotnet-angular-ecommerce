using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models {
	public class Address {

		[Key]
		public int Id { get; set; }
		[Required]
		public string PostalCode { get; set; }
		[Required]
		public string Street { get; set; }
		[Required]
		public string District { get; set; }
		[Required]
		public string City { get; set; }
		[Required]
		public string State { get; set; }
	}
}
