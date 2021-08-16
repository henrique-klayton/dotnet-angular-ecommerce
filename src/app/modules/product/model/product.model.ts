export class ProductModel {
	name: string = undefined;
	description: string = undefined;
	cost_price: string | number = undefined;
	sale_price: string | number = undefined;
	active: boolean = false;
	category: number = undefined;
	image: string = undefined;
	amount: number = undefined;

	constructor(init?: Partial<ProductModel>) {
		Object.assign(this, init);
	}
}