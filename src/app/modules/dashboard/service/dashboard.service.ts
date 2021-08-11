import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/service/base.service';
import { ProductFormModel } from '../../product/form/model/product.form.model';
import { SaleService } from '../../sales/service/sale.service';

export type CategorizedProducts = Array<{ [category: string]: ProductFormModel[] }>;

@Injectable()
export class DashboardService extends BaseService {
	constructor(
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
}