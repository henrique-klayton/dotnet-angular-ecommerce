import { ProductFormModel } from '../../product/form/model/product.form.model';

export class CartProductModel {
	id: string = undefined;
	name: string = undefined;
	unit_price: number = undefined;
	amount: number = undefined;
	price: number = 0;

	constructor(init?: Partial<CartProductModel>) {
		Object.assign(this, init);
	}

	static fromProduct = (
		product: ProductFormModel,
		amount: number
	): CartProductModel => new CartProductModel({
		id: product.id,
		name: product.name,
		unit_price: product.sale_price as number,
		amount,
		price: product.sale_price as number * amount,
	});
}