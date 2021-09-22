using System;
using Ecommerce.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

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

		public DbSet<Address> Addresses { get; set; } = null!;
		public DbSet<Category> Categories { get; set; } = null!;
		public DbSet<Product> Products { get; set; } = null!;
		public DbSet<User> Users { get; set; } = null!;
	}
}
