using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

			services.AddCors(options => {
				options.AddDefaultPolicy(policy => policy
					.WithOrigins("http://localhost:4200", "http://127.0.0.1:4200")
					.AllowAnyMethod()
					.AllowAnyHeader()
					.AllowCredentials());
			});

			services.AddDbContext<EcommerceDbContext>(options => options.UseMySql(
				Configuration.GetConnectionString("DefaultConnection"),
				ServerVersion.Parse("10.6.4-mariadb")
			));

			services.AddAuthentication(options => {
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
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

				options.Events = new JwtBearerEvents();
				options.Events.OnMessageReceived = context => {
					if (context.Request.Cookies.ContainsKey("App-Access-Token")) {
						context.Token = context.Request.Cookies["App-Access-Token"];
					}

					return Task.CompletedTask;
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

				c.AddSecurityRequirement(new OpenApiSecurityRequirement {
					{
						new OpenApiSecurityScheme {
							Reference = new OpenApiReference {
								Type = ReferenceType.SecurityScheme,
								Id = "Bearer",
							},
						},
						Array.Empty<string>()
					},
				});
			});
			services.AddSwaggerGenNewtonsoftSupport();

			services.AddScoped<IPasswordService, PasswordService>();
			services.AddScoped<ITokenService, TokenService>();
			services.AddScoped<IUpdateService, UpdateService>();
			services.AddScoped<IUserService, UserService>();
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ecommerce v1"));
			}

			// app.UseHttpsRedirection();

			app.UseRouting();
			app.UseCors();

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