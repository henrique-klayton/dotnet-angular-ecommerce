using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Ecommerce.Extensions {
	public static class JsonPatchDocumentExtensions {
		public static void PatchEntity<T>(
			this JsonPatchDocument<T> patch,
			T entity,
			ModelStateDictionary modelState,
			IEnumerable<string> immutableProperties,
			bool mutableId = false
		) where T : class {
			if (entity == null) throw new ArgumentNullException(nameof(entity));
			if (patch == null) throw new ArgumentNullException(nameof(patch));
			if (modelState == null) throw new ArgumentNullException(nameof(modelState));

			if (mutableId && immutableProperties == null)
				immutableProperties = new [] { "Id" };

			if (immutableProperties != null || immutableProperties.Any())
				ValidateImmutability(patch.Operations, modelState, immutableProperties);
			if (modelState.ErrorCount != 0) return;

			patch.ApplyTo(entity, modelState);
		}

		private static void ValidateImmutability<M>(
			List<Operation<M>> operations,
			ModelStateDictionary modelState,
			IEnumerable<string> immutableProperties
		) where M : class {
			operations.ForEach(op => {
				string key;
				switch (op.op) {
					case "add":
					case "remove":
					case "replace":
						key = op.path.Substring(1);
						break;
					case "move":
						key = op.from.Substring(1);
						break;
					default:
						return;
				}
				if (immutableProperties.Any(p => key.Equals(p.ToLower())))
					modelState.TryAddModelError(key, $"Cannot {op.op} immutable path {op.path}");
			});
		}
	}
}