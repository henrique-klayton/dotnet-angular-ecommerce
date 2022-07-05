using Ecommerce.Models;
using Ecommerce.Models.Authentication;
using Microsoft.EntityFrameworkCore;

#nullable disable
namespace Ecommerce {
	public partial class EcommerceDbContext : DbContext {
		public EcommerceDbContext() { }

		public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options) : base(options) { }

		protected override void OnModelCreating(ModelBuilder modelBuilder) {
			modelBuilder.HasCharSet("utf8mb4")
					.UseCollation("utf8mb4_general_ci");

			OnModelCreatingPartial(modelBuilder);
		}

		partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

		public DbSet<Address> Addresses { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<Product> Products { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<RefreshToken> RefreshTokens { get; set; }
		public DbSet<Role> Roles { get; set; }
		public DbSet<Sale> Sales { get; set; }
	}
}
