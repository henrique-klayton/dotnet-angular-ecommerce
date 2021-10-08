import { Injectable } from '@angular/core';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { SaleModel } from '../../cart/model/sale.model';

@Injectable()
export class SaleService extends BaseService {
	private _baseRoute = 'Sale';
	private _setOptions: ISetOptions = { useAlert: AlertType.NONE };
	constructor() {
		super();
	}

	fetchData = () => this.get<SaleModel>(this._baseRoute);
	fetchSaleById = (id: string) => this.getById<SaleModel>(this._baseRoute, id);
	insertSale = (obj: SaleModel) => this.post(this._baseRoute, obj);
	deleteSale = (id: string) => this.delete(this._baseRoute, id);
}