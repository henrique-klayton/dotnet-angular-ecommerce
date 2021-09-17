using System.Collections.Generic;
using System.Linq;
using Ecommerce.Extensions;
using Ecommerce.Models;
using Ecommerce.Models.Authentication;
using Ecommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers {
	[ApiController]
	[Authorize]
	[Route("[controller]")]
	public class UserController : ControllerBase {
		private readonly EcommerceDbContext _dbContext;
		private readonly IUserService _userService;

		public UserController(
			EcommerceDbContext dbContext,
			IUserService userService
		) {
			_dbContext = dbContext;
			_userService = userService;
		}

		[HttpGet]
		public IEnumerable<UserDTO> Get() => _dbContext.Users.Cast<UserDTO>();

		[HttpGet("{id}")]
		public ActionResult<UserDTO> GetById(int id) {
			var user = _dbContext.Users.SingleOrDefault(u => u.Id == id);

			if (user == null) return NotFound($"Usuário com id {id} não foi encontrado!");
			return Ok(user);
		}

		[HttpPost("[action]")]
		[AllowAnonymous]
		public IActionResult Authenticate(AuthenticateRequest model) {
			var response = _userService.Authenticate(model);

			if (response == null) return BadRequest(new { Error = "Email e/ou Senha inválida!" });
			return Ok(response);
		}

		[HttpPost("[action]")]
		[AllowAnonymous]
		public ActionResult<RegisterResponse> Register(RegisterRequest model) {
			if (_dbContext.Users.SingleOrDefault(u => u.Email == model.Email) != null)
				return BadRequest(new { Error = "Email já cadastrado!" });

			var response = _userService.Register(model);
			return Ok(response);
		}

		[HttpPatch("{id:int}")]
		public IActionResult Patch(int id, JsonPatchDocument<User> model) {
			var user = _dbContext.Users.SingleOrDefault(u => u.Id == id);
			if (user == null) return NotFound($"Usuário com id {id} não foi encontrado!");

			model.ApplyToEntity(user, ModelState);
			if (!ModelState.IsValid) return BadRequest(ModelState);

			_dbContext.Users.Update(user);
			_dbContext.SaveChanges();
			return Ok(model);
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id) {
			var user = _dbContext.Users.SingleOrDefault(u => u.Id == id);
			if (user == null) return NotFound($"Usuário com id {id} não encontrado!");

			_dbContext.Users.Remove(user);
			_dbContext.SaveChanges();

			return Ok();
		}
	}
}