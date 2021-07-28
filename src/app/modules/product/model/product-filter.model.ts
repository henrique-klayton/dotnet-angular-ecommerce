export class ProductFilterModel {
	name?: string = undefined;
	category?: number = undefined;
	active?: boolean = undefined;

	constructor(init?: Partial<ProductFilterModel>) {
		Object.assign(this, init);
	}
}