using System.Collections.Generic;
using System.Linq;
using Ecommerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace Ecommerce.Controllers {
	[ApiController]
	[Authorize]
	[Route("[controller]")]
	public class CategoryController : ControllerBase {
		private readonly EcommerceDbContext _dbContext;

		public CategoryController(EcommerceDbContext dbContext) {
			_dbContext = dbContext;
		}

		[HttpGet]
		public IEnumerable<CategoryDTO> Get() => _dbContext.Categories.Cast<CategoryDTO>();

		[HttpGet("{id}")]
		public ActionResult<CategoryDTO> GetById(int id) {
			var category = _dbContext.Categories.SingleOrDefault(c => c.Id == id);

			if (category == null) return NotFound($"Categoria com id {id} não encontrada!");
			return Ok(category);
		}

		[HttpPost]
		public IActionResult Post(CategoryDTO model) {
			_dbContext.Categories.Add(new Category { Name = model.Name });
			_dbContext.SaveChanges();

			return StatusCode(201);
		}

		[HttpPut("{id}")]
		public IActionResult Put(int id, CategoryDTO model) {
			var category = _dbContext.Categories.SingleOrDefault(c => c.Id == id);
			if (category == null) return NotFound($"Categoria com id {id} não encontrada!");

			category.Update(model);
			_dbContext.Categories.Update(category);
			_dbContext.SaveChanges();

			return Ok();
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id) {
			var category = _dbContext.Categories.SingleOrDefault(c => c.Id == id);
			if (category == null) return NotFound($"Categoria com id {id} não encontrada!");

			_dbContext.Categories.Remove(category);
			_dbContext.SaveChanges();

			return Ok();
		}
	}
}