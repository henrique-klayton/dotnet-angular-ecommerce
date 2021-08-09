import { CartProductModel } from './cart-product.model';

export class SaleModel {
	constructor(init?: SaleModel) {
		Object.assign(this, init);
	}
	id?: string;
	products: CartProductModel[];
	created: Date;
}