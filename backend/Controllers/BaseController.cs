using System.Collections.Generic;
using Ecommerce.Utils;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers {
	[ApiController]
	public abstract class BaseController : ControllerBase {
		private readonly string _objName;
		private readonly Gender _objGender;

		public BaseController(string objName, Gender objGender = Gender.M) {
			_objName = objName;
			_objGender = objGender;
		}

		protected ObjectResult EntityCreated(object? response = null) {
			return new(response) { StatusCode = 201 };
		}

		protected NotFoundObjectResult EntityNotFound(
			dynamic id,
			string? objName = null,
			Gender objGender = Gender.N
		) {
			GetOptionalArgs(objName, objGender, out var name, out var gender);

			return NotFound(new {
				message = $"{gender.ToString().ToUpper()} {name} não foi encontrad{gender}!",
				id
			});
		}

		protected BadRequestObjectResult IdAlreadyExists(
			dynamic id,
			string? objName = null,
			Gender objGender = Gender.N
		) {
			GetOptionalArgs(objName, objGender, out var name, out var gender);

			return BadRequest(new {
				message = $"{name} já foi cadastrad{gender}!",
				id
			});
		}

		protected BadRequestObjectResult PropertyAlreadyExists(
			IDictionary<string, string> properties,
			string? objName = null,
			Gender objGender = Gender.N
		) {
			GetOptionalArgs(objName, objGender, out var name, out var gender);

			return BadRequest(new {
				message = $"{name} já foi cadastrad{gender}!",
				properties
			});
		}

		private void GetOptionalArgs(
			string? objName,
			Gender objGender,
			out string name,
			out char gender
		) {
			name = objName ?? _objName;
			gender = objGender switch {
				Gender.N => _objGender == Gender.F ? 'a' : 'o',
				Gender.M => 'o',
				Gender.F => 'a',
				_ => throw new System.NotImplementedException(),
			};
		}
	}
}
