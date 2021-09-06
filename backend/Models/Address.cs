using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Models {
	public class Address {

		[Key]
		[Column("Id", TypeName = "char")]
		[StringLength(9, MinimumLength = 9)]
		public string PostalCode { get; set; }
		[Required]
		public string Street { get; set; }
		[Required]
		public string District { get; set; }
		[Required]
		public string City { get; set; }
		[Required]
		public string State { get; set; }

		public static Address FromDTO(AddressDTO address) {
			return new Address {
				PostalCode = address.Cep,
				Street = address.Logradouro,
				District = address.Bairro,
				City = address.Localidade,
				State = address.Uf,
			};
		}
	}

	public class AddressDTO {
		[StringLength(8, MinimumLength = 8)]
		public string Cep { get; set; }
		[Required]
		public string Logradouro { get; set; }
		[Required]
		public string Bairro { get; set; }
		[Required]
		public string Localidade { get; set; }
		[Required]
		public string Uf { get; set; }

		public AddressDTO(Address address) {
			Cep = address.PostalCode;
			Logradouro = address.Street;
			Bairro = address.District;
			Localidade = address.City;
			Uf = address.State;
		}
	}
}
