using Newtonsoft.Json;

namespace Ecommerce.Models.Dashboard {
	public class DashboardTotals {
		public int NumBranches { get; set; }
		public int NumProductsStock { get; set; }
		public int NumSales { get; set; }

		public DashboardTotals(int numBranches, int numProductsStock, int numSales) {
			NumSales = numSales;
			NumProductsStock = numProductsStock;
			NumBranches = numBranches;
		}
	}
}