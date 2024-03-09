import { CartProductModel } from './cart-product.model';

export class SaleModel {
	constructor(init?: Partial<SaleModel>) {
		Object.assign(this, init);
	}

	// FIXME Remove non-null assertion
	products: CartProductModel[] = undefined!;
	created: any = undefined;
}