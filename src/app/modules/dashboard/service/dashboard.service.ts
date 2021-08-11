import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/service/base.service';
import { PRODUCT_CATEGORIES } from 'src/app/utils/constants';
import { AddressService } from '../../endereco/service/address.service';
import { ProductFormModel } from '../../product/form/model/product.form.model';
import { ProductService } from '../../product/service/product.service';
import { SaleService } from '../../sales/service/sale.service';

export type CategorizedProducts = Array<{ [category: string]: ProductFormModel[] }>;

@Injectable()
export class DashboardService extends BaseService {
	constructor(
		private _address: AddressService,
		private _product: ProductService,
		private _sale: SaleService
	) {
		super();
	}

	fetchSales = (): Observable<number[]> => this._sale.fetchData().pipe(
		map(sales => {
			let data: number[] = new Array(12).fill(0);
			sales.forEach(sale => {
				const index = moment(sale.created.seconds * 1000).month();
				data[index] = data[index] + 1;
			});
			return data;
		})
	);
	fetchProducts = (): Observable<CategorizedProducts> => this._product.fetchData().pipe(
		map(products => {
			let categories: CategorizedProducts = PRODUCT_CATEGORIES.slice(1)
				.map(category => ({ [category.name]: [] }));
			products.forEach(product => {
				const key = PRODUCT_CATEGORIES.slice(1)[product.category].name;
				(categories[key] as ProductFormModel[]).push(product);
			});
			return categories;
		})
	);
	numSales = () => this._sale.fetchData().pipe(map(sales => sales.length));
	numAddress = () => this._address.fetchData().pipe(map(address => address.length));
	totalProductsStock = () => this._product.fetchData().pipe(
		map(products => products.reduce((total, product) => total = total + product.amount, 0))
	);
}