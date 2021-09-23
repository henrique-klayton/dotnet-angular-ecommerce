using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Models {
	public class Address {
		[Key]
		[Column("Id", TypeName = "char")]
		[StringLength(8, MinimumLength = 8)]
		public string PostalCode { get; set; }
		[Required]
		public string Street { get; set; }
		[Required]
		public string District { get; set; }
		[Required]
		public string City { get; set; }
		[Required]
		public string State { get; set; }

		public Address(string postalCode, string street, string district, string city, string state) {
			PostalCode = postalCode;
			Street = street;
			District = district;
			City = city;
			State = state;
		}

		public static implicit operator AddressDTO(Address address) => new(
			address.PostalCode,
			address.Street,
			address.District,
			address.City,
			address.State
		);
	}

	public class AddressDTO {
		[StringLength(8, MinimumLength = 8)]
		[Required]
		public string Cep { get; set; }
		[Required]
		public string Logradouro { get; set; }
		[Required]
		public string Bairro { get; set; }
		[Required]
		public string Localidade { get; set; }
		[Required]
		public string Uf { get; set; }

		public AddressDTO(string cep, string logradouro, string bairro, string localidade, string uf) {
			Cep = cep;
			Logradouro = logradouro;
			Bairro = bairro;
			Localidade = localidade;
			Uf = uf;
		}

		public static implicit operator Address(AddressDTO address) => new(
			address.Cep,
			address.Logradouro,
			address.Bairro,
			address.Localidade,
			address.Uf
		);
	}
}
