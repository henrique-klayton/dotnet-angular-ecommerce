using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Models;
using Ecommerce.Models.Dashboard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers {
	[Authorize]
	[Route("[controller]")]
	public class DashboardController : BaseController {
		private readonly EcommerceDbContext _dbContext;

		public DashboardController(EcommerceDbContext dbContext) : base("Dashboard") {
			_dbContext = dbContext;
		}

		[HttpGet("Totals")]
		public async Task<ActionResult<DashboardTotals>> Get() {
			var numBranches = await _dbContext.Addresses.CountAsync();
			var numProducts = await _dbContext.Products.SumAsync(product => product.StockAmount);
			var numSales = await _dbContext.Sales.CountAsync();

			return new DashboardTotals(numBranches, numProducts, numSales);
		}
	}
}