export class ProductFilterModel {
	name?: string = undefined;
	category?: string = undefined;
	active?: string = undefined;

	constructor(init?: Partial<ProductFilterModel>) {
		Object.assign(this, init);
	}
}