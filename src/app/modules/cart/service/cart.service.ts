import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/service/base.service';
import { isNullOrWhitespace } from 'src/app/utils/functions';
import { ProductFormModel } from '../../product/form/model/product.form.model';
import { ProductService } from '../../product/service/product.service';
import { CartProductModel } from '../model/cart-product.model';

@Injectable()
export class CartService extends BaseService {
	constructor(private _productService: ProductService) {
		super();
	}

	async executeSale(items: CartProductModel[]): Promise<void> {
		let products: ProductFormModel[] = await this._productService.fetchDataOnce();
		let promises = await Promise.allSettled(
			products.map((product) => this.updateProduct(product, items))
		);
		let errors = promises.map<string>(res => res.status === 'rejected' && res.reason);

		if(errors.length === 0) throw errors;
	}

	private updateProduct(
		product: ProductFormModel,
		items: CartProductModel[]
	): Promise<void> {
		let item = items.find((v) => product.id === v.id);
		if (isNullOrWhitespace(item))
			return;

		product.quantity -= item.quantity;
		// TODO useAlert == 'none'
		return this._productService.updateProduct(product.id, product)
			.catch((err) => Promise.reject({ error: err, product: product }));
	}
}