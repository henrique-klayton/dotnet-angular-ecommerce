import { ProductModel } from '../../product/model/product.model';

export class CartProductModel {
	name: string = undefined;
	unit_price: number = undefined;
	quantity: number = undefined;

	constructor(init?: Partial<CartProductModel>) {
		Object.assign(this, init);
	}

	static fromProduct = (product: ProductModel, quantity: number): CartProductModel =>
		new CartProductModel({ name: product.name, unit_price: product.sale_price, quantity });
}