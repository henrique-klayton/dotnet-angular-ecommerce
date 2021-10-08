export class ProductFilterModel {
	text?: string = undefined;
	category?: number | '' = '';
	status?: boolean | '' = true;

	constructor(init?: Partial<ProductFilterModel>) {
		Object.assign(this, init);
	}
}