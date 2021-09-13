using Ecommerce.Models;

namespace Ecommerce.Services {
	public interface IUpdateService {
		void Update(Category model);
	}

	public class UpdateService : IUpdateService {
		private readonly EcommerceDbContext _dbContext;

		public UpdateService(EcommerceDbContext dbContext) {
			_dbContext = dbContext;
		}

		public void Update(Category model) {
			_dbContext.Set<Category>().Update(model);
		}
	}
}