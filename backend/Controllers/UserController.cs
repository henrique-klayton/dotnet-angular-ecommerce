using System.Collections.Generic;
using System.Linq;
using Ecommerce.Extensions;
using Ecommerce.Models;
using Ecommerce.Models.Authentication;
using Ecommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Controllers {
	[Authorize]
	[Route("[controller]")]
	public class UserController : BaseController {
		private readonly EcommerceDbContext _dbContext;
		private readonly IUserService _userService;

		public UserController(
			EcommerceDbContext dbContext,
			IUserService userService
		) : base("Usuário") {
			_dbContext = dbContext;
			_userService = userService;
		}

		[HttpGet]
		public IEnumerable<UserDTO> Get() => _dbContext.Users
			.Include(u => u.Role)
			.Select(u => UserDTO.FromUser(u, u.Role.Name));

		[HttpGet("{id}")]
		public ActionResult<UserDTO> GetById(int id) {
			var user = _dbContext.Users.SingleOrDefault(u => u.Id == id);

			if (user == null) return NotFound($"Usuário com id {id} não foi encontrado!");
			return Ok(user);
		}

		[HttpPost("[action]")]
		[AllowAnonymous]
		public ActionResult<AuthenticationResponse> Authenticate(AuthenticationRequest model) {
			var authResult = _userService.Authenticate(model);

			if (authResult == null) return BadRequest(new { Error = "Email e/ou Senha inválida!" });

			var (response, cookie, cookieOptions) = authResult ?? default;

			Response.Cookies.Append(cookie.Name, cookie.Value, cookieOptions);
			return Ok(response);
		}

		[HttpPost("[action]")]
		[AllowAnonymous]
		public ActionResult<RegisterResponse> Register(RegisterRequest model) {
			if (_dbContext.Users.SingleOrDefault(u => u.Email == model.Email) != null)
				return BadRequest(new { Error = "Email já cadastrado!" });

			var response = _userService.Register(model);
			return CreatedAtAction(nameof(Get), new { id = response.Id }, response);
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

		// TODO Generate and return new access token & refresh token
		[HttpGet]
		public IActionResult RefreshToken() {
			var invalidTokenMessage = new { Error = "Invalid refresh token!" };

			Request.Cookies.TryGetValue("App-Refresh-Token", out var refreshToken);
			if (refreshToken == null) return BadRequest(invalidTokenMessage);

			var user = _dbContext.Users.FirstOrDefault(u => u.RefreshToken == refreshToken);
			if (user == null) return BadRequest(invalidTokenMessage);

			return Ok();
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