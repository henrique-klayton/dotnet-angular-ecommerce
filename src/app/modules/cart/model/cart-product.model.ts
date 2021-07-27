import { ProductModel } from '../../product/model/product.model';

export class CartProductModel {
	name: string = undefined;
	unit_price: number = undefined;
	quantity: number = undefined;
	price: number = 0;

	constructor(init?: Partial<CartProductModel>) {
		Object.assign(this, init);
	}

	static fromProduct = (product: ProductModel, quantity: number): CartProductModel =>
		new CartProductModel({
			name: product.name,
			unit_price: product.sale_price,
			quantity,
			price: product.sale_price * quantity,
		});
}