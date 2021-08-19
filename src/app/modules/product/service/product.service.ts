import { Injectable } from '@angular/core';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { isNullOrWhitespace } from 'src/app/utils/functions';
import { ProductFormModel } from '../form/model/product.form.model';
import { ProductModel } from '../model/product.model';

@Injectable()
export class ProductService extends BaseService {
	private _collection = 'Products';
	private _setOptions: ISetOptions = { useAlert: AlertType.STATUS, objName: 'Produto' }
	constructor() {
		super();
	}

	fetchData = () => this.getData<ProductFormModel>(this._collection);
	fetchDataOnce = () => this.getDataOnce<ProductFormModel>(this._collection);
	fetchProductById = (id: string) => this.getById<ProductModel>(id, this._collection);

	insertOrUpdateProduct = (obj: ProductModel, id?: string) =>
		id ? this.updateProduct(id, obj) : this.insertProduct(obj);

	insertProduct = (obj: ProductModel): Promise<void> =>
		this.create(obj, ProductModel, this._collection, this._setOptions);

	updateProduct(id: string, obj: ProductModel, useAlert?: AlertType): Promise<void> {
		let setOptions = this._setOptions;
		if (!isNullOrWhitespace(useAlert))
			setOptions.useAlert = useAlert;
		return this.update(id, obj, ProductModel, this._collection, setOptions);
	}

	deleteProduct = (id: string): Promise<void> =>
		this.delete(id, this._collection, this._setOptions);
}