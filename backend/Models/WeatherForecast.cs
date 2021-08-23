using System;

namespace E_commerce.Models {
	public class WeatherForecast {

		public DateTime Date { get; set; }

		public int TemperatureC { get; set; }

		public int TemperatureF { get; set; }

		public string Summary { get; set; }

		public WeatherForecast(DateTime date, int temperatureC, string summary) {
			Date = date;
			TemperatureC = temperatureC;
			TemperatureF = 32 + (int)(temperatureC / 0.5556);
			Summary = summary;
		}
	}
}
