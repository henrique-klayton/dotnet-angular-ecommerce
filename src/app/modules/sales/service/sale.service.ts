import { Injectable } from '@angular/core';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { SaleModel } from '../../cart/model/sale.model';

@Injectable()
export class SaleService extends BaseService {
	private collection = 'Sales';
	private setOptions: ISetOptions = { useAlert: AlertType.NONE };
	constructor() {
		super();
	}

	fetchSales = () => this.getData<SaleModel>(this.collection);
	fetchSalesOnce = () => this.getDataOnce<SaleModel>(this.collection);
	fetchSaleById = (id: string) => this.getById<SaleModel>(id, this.collection);
	insertSale = (obj: SaleModel): Promise<void> =>
		this.create(obj, SaleModel, this.collection, this.setOptions);
	deleteSale = (id: string): Promise<void> =>
		this.delete(id, this.collection, this.setOptions);
}