using System.Collections.Generic;
using System.Linq;
using Ecommerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ecommerce.Controllers {
	[ApiController]
	[Authorize]
	[Route("[controller]")]
	public class AddressController : ControllerBase {

		private readonly ILogger<AddressController> _logger;
		private readonly EcommerceDbContext _dbContext;

		public AddressController(ILogger<AddressController> logger, EcommerceDbContext dbContext) {
			_logger = logger;
			_dbContext = dbContext;
		}

		[HttpGet]
		public IEnumerable<Address> Get() {
			return _dbContext.Addresses.ToList();
		}

		[HttpGet("{cep}")]
		public ActionResult<Address> GetById(string cep) {
			var address = _dbContext.Addresses.SingleOrDefault(a => a.PostalCode == cep);
			if (address == null) return NotFound();

			return Ok(address);
		}

		[HttpPost]
		public IActionResult Post(AddressDTO address) {
			_dbContext.Addresses.Add(Address.FromDTO(address));

			try {
				_dbContext.SaveChanges();
			} catch (DbUpdateException err) {
				if (err.InnerException != null) return BadRequest(err.InnerException.Message);
			}
			return Ok();
		}

		[HttpDelete("{cep}")]
		public IActionResult Delete(string cep) {
			var address = _dbContext.Addresses.SingleOrDefault(a => a.PostalCode == cep);
			if (address == null) return NotFound($"Endereço com CEP {cep} não encontrado!");

			_dbContext.Remove(address);
			_dbContext.SaveChanges();
			return Ok();
		}
	}
}
