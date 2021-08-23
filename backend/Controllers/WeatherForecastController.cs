using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_commerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace E_commerce.Controllers {
	[ApiController]
	[Route("[controller]")]
	public class WeatherForecastController : ControllerBase {
		private static readonly string[] Summaries = new[] {
			"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
		};

		private readonly ILogger<WeatherForecastController> _logger;

		public WeatherForecastController(ILogger<WeatherForecastController> logger) {
			_logger = logger;
		}

		[HttpGet]
		public IEnumerable<WeatherForecast> Get() {
			var rng = new Random();
			return Enumerable.Range(1, 5).Select(index => new WeatherForecast(
				DateTime.Now.AddDays(index),
				rng.Next(-20, 55),
				Summaries[rng.Next(Summaries.Length)]
			)).ToArray();
		}
	}
}
