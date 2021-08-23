using System;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace E_commerce {
	public partial class EcommerceDbContext : DbContext {
		public EcommerceDbContext() {}

		public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options) : base(options) {}

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
	}
}
