using System.Collections.Generic;
using System.Linq;
using Ecommerce.Models;
using Ecommerce.Services;
using Ecommerce.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace Ecommerce.Controllers {
	[ApiController]
	[Authorize]
	[Route("[controller]")]
	public class CategoryController : BaseController {
		private readonly EcommerceDbContext _dbContext;
		private readonly IUpdateService _up;

		public CategoryController(EcommerceDbContext dbContext, IUpdateService up)
			: base("Categoria", Gender.F) {
			_dbContext = dbContext;
			_up = up;
		}

		[HttpGet]
		public IEnumerable<CategoryDTO> Get() => _dbContext.Categories.Cast<CategoryDTO>();

		[HttpGet("{id:int}")]
		public ActionResult<CategoryDTO> GetById(int id) {
			var category = _dbContext.Categories.SingleOrDefault(c => c.Id == id);

			if (category == null) return EntityNotFound(id);
			return Ok(category);
		}

		[HttpPost]
		public IActionResult Post(CategoryDTO model) {
			_dbContext.Categories.Add(new Category { Name = model.Name });
			_dbContext.SaveChanges();

			return StatusCode(201);
		}

		// TODO Adicionar produtos na categoria
		// [HttpPatch("{id:int}")]
		// public IActionResult Patch(int id, CategoryDTO model) {
		// 	var category = _dbContext.Categories.SingleOrDefault(c => c.Id == id);
		// 	if (category == null) return NotFound($"Categoria com id {id} não encontrada!");

		// 	_up.Update(new Category { });
		// 	_dbContext.SaveChanges();

		// 	return Ok();
		// }

		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id) {
			var category = _dbContext.Categories.SingleOrDefault(c => c.Id == id);
			if (category == null) return EntityNotFound(id);

			_dbContext.Categories.Remove(category);
			_dbContext.SaveChanges();

			return Ok();
		}
	}
}