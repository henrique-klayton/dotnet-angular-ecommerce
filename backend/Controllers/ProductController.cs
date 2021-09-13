using System;
using System.Collections.Generic;
using System.Linq;
using Ecommerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers {
	[ApiController]
	[Authorize]
	[Route("[controller]")]
	public class ProductController : ControllerBase {
		private readonly EcommerceDbContext _dbContext;

		public ProductController(EcommerceDbContext dbContext) {
			_dbContext = dbContext;
		}

		[HttpGet]
		public IEnumerable<ProductDTO> Get() {
			var res = _dbContext.Products.Include(p => p.Category).Select<ProductDTO>((p, c) => new() {
				Name = p.Name,
				CostPrice = p.CostPrice,
				SalePrice = p.SalePrice,
				StockAmount = p.StockAmount,
				Status = p.Status,
				Category = p.Category,
				CategoryId = p.CategoryId,
			}).ToList();
			Console.WriteLine(res[0].Category.Name);
			return res.Cast<ProductDTO>();
		}

		[HttpGet("{id}")]
		public ActionResult<ProductDTO> GetById(int id) {
			ProductDTO product = _dbContext.Products
				.Include(p => p.Category)
				.SingleOrDefault(p => p.Id == id);

			if (product == null) return NotFound($"Id Not Found Message!");
			return Ok(product);
		}

		[HttpPost]
		public IActionResult Post(ProductDTO model) {
			Console.WriteLine(model.Name);
			_dbContext.Products.Add(model);
			_dbContext.SaveChanges();

			return StatusCode(201);
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id) {
			var product = _dbContext.Products.SingleOrDefault(p => p.Id == id);
			if (product == null) return NotFound($"Id Not Found Message!");

			_dbContext.Products.Remove(product);
			_dbContext.SaveChanges();

			return Ok();
		}
	}
}