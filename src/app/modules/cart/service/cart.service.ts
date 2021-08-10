import { Injectable } from '@angular/core';
import { AlertType } from 'src/app/shared/enums';
import { BaseService } from 'src/app/shared/service/base.service';
import { isNullOrWhitespace } from 'src/app/utils/functions';
import { ProductFormModel } from '../../product/form/model/product.form.model';
import { ProductService } from '../../product/service/product.service';
import { SaleService } from '../../sales/service/sale.service';
import { CartProductModel } from '../model/cart-product.model';

@Injectable()
export class CartService extends BaseService {

	constructor(
		private _productService: ProductService,
		private _saleService: SaleService
	) {
		super();
	}

	async executeSale(items: CartProductModel[]): Promise<void> {
		let products: ProductFormModel[] = await this._productService.fetchDataOnce();
		let promises = await Promise.allSettled(
			products.map((product) => this.updateProduct(product, items))
		);
		let errors = promises.map<string>(res => {
			if (res.status === 'rejected')
				return res.reason;
		}).filter(res => !isNullOrWhitespace(res));

		if(errors.length > 0) throw errors;
		return this._saleService.insertSale({ products: items, created: new Date() });
	}

	private updateProduct(
		product: ProductFormModel,
		items: CartProductModel[]
	): Promise<void> {
		let item = items.find((v) => product.id === v.id);
		if (isNullOrWhitespace(item))
			return;

		product.amount -= item.amount;
		return this._productService.updateProduct(product.id, product, AlertType.NONE)
			.catch((err) => Promise.reject({ error: err, product: product }));
	}
}