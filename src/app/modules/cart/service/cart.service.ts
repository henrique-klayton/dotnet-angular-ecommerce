import { Injectable } from '@angular/core';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { isNullOrWhitespace } from 'src/app/utils/functions';
import { ProductFormModel } from '../../product/form/model/product.form.model';
import { ProductService } from '../../product/service/product.service';
import { CartProductModel } from '../model/cart-product.model';
import { SaleModel } from '../model/sale.model';

@Injectable()
export class CartService extends BaseService {
	private collection = 'Sales';
	private setOptions: ISetOptions = { useAlert: AlertType.STATUS, objName: 'Venda' }

	constructor(private _productService: ProductService) {
		super();
	}

	fetchSales = () => this.getData<SaleModel>(this.collection);
	fetchSalesOnce = () => this.getDataOnce<SaleModel>(this.collection);
	fetchSaleById = (id: string) => this.getById<SaleModel>(id, this.collection);
	insertSale = (obj: SaleModel): Promise<void> =>
		this.create(obj, SaleModel, this.collection, this.setOptions);
	deleteSale = (id: string): Promise<void> =>
		this.delete(id, this.collection, this.setOptions);

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
		return this.insertSale({ products: items, created: new Date() });
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