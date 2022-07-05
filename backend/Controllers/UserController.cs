using System;
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
		private readonly IPasswordService _passwordService;
		private readonly ITokenService _tokenService;
		private readonly IUserService _userService;

		public UserController(
			EcommerceDbContext dbContext,
			IPasswordService passwordService,
			ITokenService tokenService,
			IUserService userService
		) : base("Usuário") {
			_dbContext = dbContext;
			_passwordService = passwordService;
			_tokenService = tokenService;
			_userService = userService;
		}

		[HttpGet]
		public IEnumerable<UserDTO> Get() => _dbContext.Users
			.Include(u => u.Role)
			.Select(u => UserDTO.FromUser(u, u.Role.Name));

		[HttpGet("{id:int}")]
		public ActionResult<UserDTO> GetById(int id) {
			var user = _dbContext.Users.SingleOrDefault(u => u.Id == id);

			if (user == null) return NotFound($"Usuário com id {id} não foi encontrado!");
			return Ok(user);
		}

		[HttpPost("[action]")]
		[AllowAnonymous]
		public ActionResult<AuthenticationResponse> Authenticate(AuthenticationRequest model) {
			var badRequestMessage = BadRequest(new { Error = "Email e/ou Senha inválida!" });

			var user = _dbContext.Users.Include(u => u.Role).SingleOrDefault(u => u.Email == model.Email);
			if (user == null) return badRequestMessage;

			if (!_passwordService.ValidatePassword(user.PasswordHash, model.Password))
				return badRequestMessage;

			var (response, accessToken, refreshToken) = _userService.Authenticate(user);

			_dbContext.SaveChanges();
			SetCookies((accessToken, refreshToken));
			return Ok(response);
		}

		[HttpPost("[action]")]
		[AllowAnonymous]
		public ActionResult<RegisterResponse> Register(RegisterRequest model) {
			if (_dbContext.Users.SingleOrDefault(u => u.Email == model.Email) != null)
				return BadRequest(new { Error = "Email já cadastrado!" });

			_passwordService.HashPassword(model.Password, out var passwordHash);

			var role = _dbContext.Roles.Single(r => r.Id == 3);
			var user = new User(
				name: model.Name,
				email: model.Email,
				passwordHash: passwordHash,
				roleId: 3,
				role: role
			);

			var entry = _dbContext.Users.Add(user);
			_dbContext.SaveChanges();

			var newUser = UserDTO.FromUser(entry.Entity, role.Name);

			return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
		}

		[HttpPatch("{id:int}")]
		public ActionResult<JsonPatchDocument<User>> Patch(int id, JsonPatchDocument<User> model) {
			var user = _dbContext.Users.SingleOrDefault(u => u.Id == id);
			if (user == null) return NotFound($"Usuário com id {id} não foi encontrado!");

			model.ApplyToEntity(user, ModelState);
			if (!ModelState.IsValid) return BadRequest(ModelState);

			_dbContext.Users.Update(user);
			_dbContext.SaveChanges();
			return Ok(model);
		}

		[HttpPost("[action]")]
		public IActionResult RefreshToken() {
			var invalidTokenMessage = new { Error = "Invalid refresh token!" };

			Request.Cookies.TryGetValue("App-Refresh-Token", out var refreshToken);
			if (refreshToken == null) return BadRequest(invalidTokenMessage);

			var user = _dbContext.Users.FirstOrDefault(u => u.RefreshToken != null && u.RefreshToken.Token == refreshToken);
			if (user == null) return BadRequest(invalidTokenMessage);
			if (!_tokenService.ValidateRefreshToken(user.RefreshToken!)) return BadRequest(invalidTokenMessage);

			var tokens = _tokenService.GenerateTokens(user);
			_dbContext.SaveChanges();
			SetCookies(tokens);

			return Ok();
		}

		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id) {
			var user = _dbContext.Users.SingleOrDefault(u => u.Id == id);
			if (user == null) return NotFound($"Usuário com id {id} não encontrado!");

			_dbContext.Users.Remove(user);
			_dbContext.SaveChanges();

			return Ok();
		}

		private void SetCookies((AccessToken, RefreshTokenDto) tokens) {
			Response.Cookies.Append("App-Access-Token", tokens.Item1.Token, tokens.Item1.CookieOptions);
			Response.Cookies.Append("App-Refresh-Token", tokens.Item2.Token, tokens.Item2.CookieOptions);
		}
	}
}