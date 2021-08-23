using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace E_commerce.Models {
	public partial class EcommerceContext : DbContext {
		public EcommerceContext() {
		}

		public EcommerceContext(DbContextOptions<EcommerceContext> options) : base(options) {
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
			if (!optionsBuilder.IsConfigured) {
				optionsBuilder
					.UseMySql("name=DatabaseConnectionString", ServerVersion.Parse("10.6.4-mariadb"));
			}
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder) {
			modelBuilder.HasCharSet("utf8mb4")
					.UseCollation("utf8mb4_general_ci");

			OnModelCreatingPartial(modelBuilder);
		}

		partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
	}
}
