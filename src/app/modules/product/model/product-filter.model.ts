export class ProductFilterModel {
	text?: string = undefined;
	category?: number | '' = '';
	active?: boolean | '' = true;

	constructor(init?: Partial<ProductFilterModel>) {
		Object.assign(this, init);
	}
}