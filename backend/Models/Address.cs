using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models {
	public class Address {

		[Key]
		public int Id { get; set; }
		public string PostalCode { get; set; }
		public string Street { get; set; }
		public string District { get; set; }
		public string City { get; set; }
		public string State { get; set; }

		public Address(int id, string postalCode, string street, string district, string city, string state) {
			Id = id;
			PostalCode = postalCode;
			Street = street;
			District = district;
			City = city;
			State = state;
		}
	}
}
