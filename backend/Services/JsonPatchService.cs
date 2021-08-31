using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;

namespace Ecommerce.Services {
	public interface IJsonPatchService {
		void PatchEntity<E, M>(
			E entity,
			JsonPatchDocument<M> model,
			IEnumerable<string> blockedProperties
		) where M : class;
	}

	public class JsonPatchService : IJsonPatchService {
		public void PatchEntity<E, M>(
			E entity,
			JsonPatchDocument<M> model,
			IEnumerable<string> blockedProperties
		) where M : class {
			ValidateProperties(model.Operations, blockedProperties);
		}

		private static IEnumerable<string> ValidateProperties<M>(
			List<Operation<M>> operations,
			IEnumerable<string> blockedProperties
		) where M : class {
			return operations.Select(op => {
				switch (op.op) {
					case "add":
					case "remove":
					case "replace":
						if (blockedProperties.Any(prop => op.path.Substring(1).Equals(prop.ToLower())))
							return $"Cannot modify path {op.path}";
						break;
					case "move":
						if (blockedProperties.Any(prop => op.from.Substring(1).Equals(prop.ToLower())))
							return $"Cannot move from path {op.path}";
						break;
					default:
						break;
				}
				return null;
			});
		}
	}
}