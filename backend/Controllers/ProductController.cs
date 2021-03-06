using System.Collections.Generic;
using System.Linq;
using Ecommerce.Models;
using Ecommerce.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers {
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

		[HttpPost]
		public IActionResult Post(ProductDTO model) {
			var category = _dbContext.Categories.SingleOrDefault(c => c.Id == model.CategoryId);
			if (category == null) return CategoryNotFound(model.CategoryId);

			if (_dbContext.Products.SingleOrDefault(p => p.Name == model.Name) != null) {
				return PropertyAlreadyExists(new Dictionary<string, string>() {
				{ "Name", model.Name }
				});
			}

			_dbContext.Products.Add(Product.FromDto(model, category));
			_dbContext.SaveChanges();

			return EntityCreated();
		}

		[HttpPut("{id:int}")]
		public IActionResult Put(int id, ProductUpdateDTO model) {
			var category = _dbContext.Categories.SingleOrDefault(c => c.Id == model.CategoryId);
			if (category == null) return CategoryNotFound(model.CategoryId);

			var product = _dbContext.Products.SingleOrDefault(p => p.Id == id);
			if (product == null) return EntityNotFound(id);

			product.Update(model, category);
			_dbContext.SaveChanges();

			return Ok();
		}

		[HttpPatch("{id:int}/Category/{categoryId:int}")]
		public IActionResult ChangeCategory(int id, int categoryId) {
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

		private NotFoundObjectResult CategoryNotFound(int categoryId) => EntityNotFound(
			categoryId,
			"Categoria",
			Gender.F
		);
	}
}