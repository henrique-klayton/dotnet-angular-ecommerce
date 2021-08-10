import { CartProductModel } from './cart-product.model';

export class SaleModel {
	constructor(init?: Partial<SaleModel>) {
		Object.assign(this, init);
	}
	products: CartProductModel[] = undefined;
	created: Date = undefined;
}