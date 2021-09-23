import { Injectable } from '@angular/core';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { SaleModel } from '../../cart/model/sale.model';

@Injectable()
export class SaleService extends BaseService {
	private _collection = 'Sales';
	private _setOptions: ISetOptions = { useAlert: AlertType.NONE };
	constructor() {
		super();
	}

	fetchData = () => this.getData<SaleModel>(this._collection);
	fetchDataOnce = () => this.getDataOnce<SaleModel>(this._collection);
	fetchSaleById = (id: string) => this.getById<SaleModel>(id, this._collection);
	insertSale = (obj: SaleModel): Promise<void> =>
		this.create(obj, SaleModel, this._collection, this._setOptions);
	deleteSale = (id: string): Promise<void> =>
		this.delete(id, this._collection, this._setOptions);
}