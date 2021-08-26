using System.Collections.Generic;
using System.Linq;
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

		public UserController(EcommerceDbContext dbContext, IUserService userService) {
			_dbContext = dbContext;
			_userService = userService;
		}

		[HttpGet]
		public IEnumerable<UserDTO> Get() => _dbContext.Users.Select(u => new UserDTO(u)).ToList();

		[HttpPatch]
		public IActionResult Patch(JsonPatchDocument<UserDTO> model) {
			// var user = _dbContext.Users.SingleOrDefault(u => u.Id == model.Id);
			// _dbContext.Users.Add(user);
			// _dbContext.SaveChanges();
			return Ok(model);
		}

		[HttpPost("[action]")]
		[AllowAnonymous]
		public IActionResult Authenticate(AuthenticateRequest model) {
			var response = _userService.Authenticate(model);

			if (response == null)
				return BadRequest(new { message = "Email e/ou Senha inválida!" });
			return Ok(response);
		}

		[HttpPost("[action]")]
		[AllowAnonymous]
		public ActionResult<RegisterResponse> Register(RegisterRequest model) {
			var response = _userService.Register(model);
			return Ok(response);
		}
	}
}