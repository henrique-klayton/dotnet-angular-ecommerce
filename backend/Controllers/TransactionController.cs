using System.Collections.Generic;
using System.Linq;
using Ecommerce.Models;
using Ecommerce.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers {
	[Authorize]
	[Route("[controller]")]
	public class TransactionController : BaseController {
		private readonly EcommerceDbContext _dbContext;

		public TransactionController(EcommerceDbContext dbContext) : base("Transação", Gender.F) {
			_dbContext = dbContext;
		}

		[HttpGet]
		public IEnumerable<TransactionDTO> Get() => _dbContext.Transactions
			.Cast<TransactionDTO>()
			.ToList();

		[HttpGet("{id}")]
		public ActionResult<TransactionDTO> GetById(int id) {
			var transaction = _dbContext.Transactions.SingleOrDefault(t => t.Id == id);
			if (transaction == null) return EntityNotFound(id);

			return Ok(transaction);
		}

		[HttpPost]
		public IActionResult Post(TransactionDTO model) {
			var id = _dbContext.Transactions.SingleOrDefault(t => t.Id == model.Id)?.Id;
			if (id != null) return IdAlreadyExists(id);

			_dbContext.Transactions.Add(Transaction.FromDto(model, new List<TransactionItem>()));
			_dbContext.SaveChanges();

			return EntityCreated();
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id) {
			var transaction = _dbContext.Transactions.SingleOrDefault(t => t.Id == id);
			if (transaction == null) return EntityNotFound(id);

			_dbContext.Transactions.Remove(transaction);
			_dbContext.SaveChanges();

			return Ok();
		}
	}
}