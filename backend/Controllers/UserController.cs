using Microsoft.AspNetCore.Mvc;
using Ecommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Ecommerce.Models.Authentication;
using System.Collections.Generic;
using Ecommerce.Models;
using System.Linq;

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
		[AllowAnonymous]
		public IEnumerable<User> Get() {
			return _dbContext.Users.ToList();
		}

		[HttpPost("Login")]
		[AllowAnonymous]
		public IActionResult Login(AuthenticateRequest model) {
			var response = _userService.Authenticate(model);

			if (response == null)
				return BadRequest(new { message = "Email e/ou Senha inválida!" });

			return Ok(response);
		}

		[HttpPost("Register")]
		[AllowAnonymous]
		public ActionResult<RegisterResponse> Register(RegisterRequest model) {
			var response = _userService.Register(model);

			return Ok(response);
		}
	}
}