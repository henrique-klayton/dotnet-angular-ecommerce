export class ProductModel {
	name: string = undefined;
	description: string = undefined;
	cost_price: number = undefined;
	sale_price: number = undefined;
	active: boolean = false;
	category: string = undefined;
	image: string = undefined;
	quantidade: number = undefined;

	constructor(init?: Partial<ProductModel>) {
		Object.assign(this, init);
	}
}