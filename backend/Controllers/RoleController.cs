using System.Collections.Generic;
using System.Linq;
using Ecommerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers {
	[Authorize]
	[Route("[controller]")]
	public class RoleController : BaseController {
		private readonly EcommerceDbContext _dbContext;

		public RoleController(EcommerceDbContext dbContext) : base("Permissão") {
			_dbContext = dbContext;
		}

		[HttpGet]
		public IEnumerable<RoleDTO> Get() => _dbContext.Roles.Select(r => RoleDTO.FromRole(r));

		[HttpGet("{id}")]
		public ActionResult<RoleDTO> GetById(int id, [FromQuery] bool includeUsers = false) {
			var role = _dbContext.Roles.SingleOrDefault(r => r.Id == id);
			if (role == null) return EntityNotFound($"Id Not Found Message!");

			if (includeUsers) _dbContext.Entry(role).Collection(r => r.Users).Load();

			return Ok(role);
		}

		// TODO Remover usuários
		[HttpPatch("{id:int}")]
		public IActionResult Patch(int id, RolePatchDTO model) {
			var role = _dbContext.Roles
				.Include(c => c.Users)
				.SingleOrDefault(c => c.Id == id);
			if (role == null) return EntityNotFound(id);

			if (model.Name != null) role.Name = model.Name;
			if (model.Users != null) role.Users = role.Users.Concat(
				_dbContext.Users.Where(p => model.Users.Contains(p.Id))
			).ToList();

			_dbContext.SaveChanges();

			return Ok();
		}

		[HttpPost]
		public IActionResult Post(RoleDTO model) {
			_dbContext.Roles.Add(Role.FromDto(model, new List<User>()));
			_dbContext.SaveChanges();

			return StatusCode(201);
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id) {
			var role = _dbContext.Roles.SingleOrDefault(r => r.Id == id);
			if (role == null) return NotFound($"Id Not Found Message!");

			_dbContext.Roles.Remove(role);
			_dbContext.SaveChanges();

			return Ok();
		}
	}
}