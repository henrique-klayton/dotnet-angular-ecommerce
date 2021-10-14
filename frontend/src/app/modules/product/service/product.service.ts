import { Injectable } from '@angular/core';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { isNullOrWhitespace } from 'src/app/utils/functions';
import { ProductFormModel } from '../form/model/product.form.model';
import { ProductModel } from '../model/product.model';

@Injectable()
export class ProductService extends BaseService {
	private _baseRoute = 'Product';
	private _setOptions: ISetOptions = { useAlert: AlertType.STATUS, objName: 'Produto' }
	constructor() {
		super();
	}

	fetchData = () => this.getAll<ProductFormModel>(this._baseRoute);
	fetchProductById = (id: number) => this.getById<ProductModel>(this._baseRoute, id);

	insertOrUpdateProduct = (obj: ProductModel, id?: number) =>
		id ? this.updateProduct(id, obj) : this.insertProduct(obj);

	insertProduct = (obj: ProductModel) => this.post(this._baseRoute, obj);

	updateProduct(id: number, obj: ProductModel, useAlert?: AlertType) {
		let setOptions = this._setOptions;
		if (!isNullOrWhitespace(useAlert))
			setOptions.useAlert = useAlert;
		return this.put(this._baseRoute, id, obj);
	}

	deleteProduct = (id: number) => this.delete(this._baseRoute, id);
}