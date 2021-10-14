using System.Collections.Generic;
using System.Linq;
using Ecommerce.Models;
using Ecommerce.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers {
	[Authorize]
	[Route("[controller]")]
	public class SaleController : BaseController {
		private readonly EcommerceDbContext _dbContext;

		public SaleController(EcommerceDbContext dbContext) : base("Venda", Gender.F) {
			_dbContext = dbContext;
		}

		[HttpGet]
		public IEnumerable<SaleDTO> Get() => _dbContext.Sales.Select(s => SaleDTO.FromEntity(s));

		[HttpGet("{id}")]
		public ActionResult<SaleDTO> GetById(int id) {
			var sale = _dbContext.Sales.SingleOrDefault(s => s.Id == id);
			if (sale == null) return EntityNotFound(id);

			return Ok(SaleDTO.FromEntity(sale));
		}

		[HttpPost]
		public IActionResult Post(SaleDTO model) {
			var id = _dbContext.Sales.SingleOrDefault(s => s.Id == model.Id)?.Id;
			if (id != null) return IdAlreadyExists(id);

			_dbContext.Sales.Add(Sale.FromDto(model, new List<SaleItem>()));
			_dbContext.SaveChanges();

			return EntityCreated();
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id) {
			var sale = _dbContext.Sales.SingleOrDefault(s => s.Id == id);
			if (sale == null) return EntityNotFound(id);

			_dbContext.Sales.Remove(sale);
			_dbContext.SaveChanges();

			return Ok();
		}
	}
}