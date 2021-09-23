import { Injector } from '@angular/core';

export class AppInjector {
	private static _injector: Injector;

	static set injector(injector: Injector) {
		AppInjector._injector = injector;
	}

	static get injector(): Injector {
		return AppInjector._injector;
	}
}
