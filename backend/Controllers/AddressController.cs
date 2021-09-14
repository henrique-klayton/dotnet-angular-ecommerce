using System.Collections.Generic;
using System.Linq;
using Ecommerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers {
	[ApiController]
	[Authorize]
	[Route("[controller]")]
	public class AddressController : BaseController {
		private readonly EcommerceDbContext _dbContext;

		public AddressController(EcommerceDbContext dbContext) : base("Endereço") {
			_dbContext = dbContext;
		}

		[HttpGet]
		public IEnumerable<AddressDTO> Get() => _dbContext.Addresses.Cast<AddressDTO>();

		[HttpGet("{cep}")]
		public ActionResult<AddressDTO> GetById(string cep) {
			var address = _dbContext.Addresses.SingleOrDefault(a => a.PostalCode == cep);

			if (address == null) return EntityNotFound(cep);
			return Ok(address);
		}

		[HttpPost]
		public IActionResult Post(AddressDTO model) {
			if (_dbContext.Addresses.SingleOrDefault(a => a.PostalCode == model.Cep) != null)
				return IdAlreadyExists(model.Cep);

			_dbContext.Addresses.Add(model);
			_dbContext.SaveChanges();

			return StatusCode(201);
		}

		[HttpDelete("{cep}")]
		public IActionResult Delete(string cep) {
			var address = _dbContext.Addresses.SingleOrDefault(a => a.PostalCode == cep);
			if (address == null) return EntityNotFound(cep);

			_dbContext.Addresses.Remove(address);
			_dbContext.SaveChanges();

			return Ok();
		}
	}
}
