import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/service/base.service';
import { ProductFormModel } from '../../product/form/model/product.form.model';
import { ProductService } from '../../product/service/product.service';
import { CartProductModel } from '../model/cart-product.model';

@Injectable()
export class CartService extends BaseService {
	constructor(private _productService: ProductService) {
		super();
	}

	async executeSale(items: CartProductModel[]) {
		let products = await this._productService.fetchDataOnce();
		let promises: Array<Promise<void>> = [];
		products.map((product) => {
			let item = items.find((v) => product.id === v.id);
			product.quantity -= item.quantity;
			promises.push(this._productService.updateProduct(product.id, product));
		});
		return Promise.all(promises);
	}
}