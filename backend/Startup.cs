using System;
using System.Linq;
using System.Text;
using Ecommerce.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace Ecommerce {
	public class Startup {
		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		public void ConfigureServices(IServiceCollection services) {
			services
				.AddControllers(options => {
					options.InputFormatters.Insert(0, GetJsonPatchInputFormatter());
				}).AddNewtonsoftJson();

			services.AddDbContext<EcommerceDbContext>(options => options.UseMySql(
				Configuration.GetConnectionString("DefaultConnection"),
				ServerVersion.Parse("10.6.4-mariadb")
			));

			services.AddAuthentication(options => {
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(options => {
				var key = Encoding.ASCII.GetBytes(Configuration["JWTSecret"]);

				options.SaveToken = true;

				options.TokenValidationParameters = new TokenValidationParameters {
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(key),
					ValidateIssuer = false,
					ValidateAudience = false,
					ValidateLifetime = true,
				};
			});

			services.AddSwaggerGen(c => {
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "Ecommerce", Version = "v1" });
				c.EnableAnnotations();

				c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
					Name = "Authorization",
					Type = SecuritySchemeType.ApiKey,
					BearerFormat = "JWT",
					Scheme = "Bearer",
					In = ParameterLocation.Header,
					Description = "Enter your JWT Token below.",
				});

				c.AddSecurityRequirement(new OpenApiSecurityRequirement {{
					new OpenApiSecurityScheme {
						Reference = new OpenApiReference {
							Type = ReferenceType.SecurityScheme,
							Id = "Bearer",
						}
					},
					Array.Empty<string>()
				}});
			});
			services.AddSwaggerGenNewtonsoftSupport();

			services.AddScoped<IPasswordService, PasswordService>();
			services.AddScoped<ITokenService, TokenService>();
			services.AddScoped<IUpdateService, UpdateService>();
			services.AddScoped<IUserService, UserService>();
		}

		public void Configure(
			IApplicationBuilder app,
			IWebHostEnvironment env,
			EcommerceDbContext dbContext,
			IPasswordService passwordService
		) {
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ecommerce v1"));
				DatabaseSeeder.Seed(dbContext, passwordService, Configuration);
			}

			// app.UseHttpsRedirection();

			app.UseRouting();
			app.UseCors(config => config
					.AllowAnyOrigin()
					.AllowAnyMethod()
					.AllowAnyHeader());

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints => {
				endpoints.MapControllers();
			});
		}

		private static NewtonsoftJsonPatchInputFormatter GetJsonPatchInputFormatter() {
			return new ServiceCollection()
					.AddLogging()
					.AddMvc()
					.AddNewtonsoftJson()
					.Services
					.BuildServiceProvider()
					.GetRequiredService<IOptions<MvcOptions>>()
					.Value
					.InputFormatters
					.OfType<NewtonsoftJsonPatchInputFormatter>()
					.First();
		}
	}
}
