using System;
using System.Collections.Generic;
using System.Linq;
using Ecommerce.Models;
using Ecommerce.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers {
	[ApiController]
	[Authorize]
	[Route("[controller]")]
	public class ProductController : BaseController {
		private readonly EcommerceDbContext _dbContext;

		public ProductController(EcommerceDbContext dbContext) : base("Produto") {
			_dbContext = dbContext;
		}

		[HttpGet]
		public IEnumerable<ProductDTO> Get() => _dbContext.Products
			.Include(p => p.Category)
			.AsEnumerable()
			.Select(p => ProductDTO.FromProduct(p));

		[HttpGet("{id}")]
		public ActionResult<ProductDTO> GetById(int id) {
			var product = _dbContext.Products
				.Include(p => p.Category)
				.SingleOrDefault(p => p.Id == id);

			if (product == null) return EntityNotFound(id);
			return Ok(ProductDTO.FromProduct(product));
		}

		// [HttpPost]
		// public IActionResult Post(ProductDTO model) {
		// 	// TODO Return 400 if id already exists
		// 	Console.WriteLine(model.Name);
		// 	_dbContext.Products.Add(model);
		// 	_dbContext.SaveChanges();

		// 	return StatusCode(201);
		// }

		// [HttpPatch("{id:int}")]
		// public IActionResult Patch(int id, JsonPatchDocument<>) {
		// 	// Console.WriteLine(model.Name);
		// 	// _dbContext.Products.Add(model);
		// 	// _dbContext.SaveChanges();

		// 	return StatusCode(201);
		// }

		[HttpPatch("{id:int}/[action]/{categoryId:int}")]
		public IActionResult Category(int id, int categoryId) {
			var category = _dbContext.Categories.SingleOrDefault(c => c.Id == categoryId);
			if (category == null) return EntityNotFound(categoryId, "Categoria", Gender.F);

			var product = _dbContext.Products
				.Include(p => p.Category)
				.SingleOrDefault(p => p.Id == id);
			if (product == null) return EntityNotFound(id);

			product.CategoryId = categoryId;
			product.Category = category;

			_dbContext.Products.Update(product);
			_dbContext.SaveChanges();

			return Ok();
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id) {
			var product = _dbContext.Products.SingleOrDefault(p => p.Id == id);
			if (product == null) return EntityNotFound(id);

			_dbContext.Products.Remove(product);
			_dbContext.SaveChanges();

			return Ok();
		}
	}
}