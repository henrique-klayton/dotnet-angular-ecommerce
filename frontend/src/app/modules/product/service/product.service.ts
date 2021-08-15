import { Injectable } from '@angular/core';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { isNullOrWhitespace } from 'src/app/utils/functions';
import { ProductFormModel } from '../form/model/product.form.model';
import { ProductModel } from '../model/product.model';

@Injectable()
export class ProductService extends BaseService {
	private collection = 'Products';
	private setOptions: ISetOptions = { useAlert: AlertType.STATUS, objName: 'Produto' }
	constructor() {
		super();
	}

	fetchData = () => this.getData<ProductFormModel>(this.collection);
	fetchDataOnce = () => this.getDataOnce<ProductFormModel>(this.collection);
	fetchProductById = (id: string) => this.getById<ProductModel>(id, this.collection);

	insertOrUpdateProduct = (obj: ProductModel, id?: string) =>
		id ? this.updateProduct(id, obj) : this.insertProduct(obj);

	insertProduct = (obj: ProductModel): Promise<void> =>
		this.create(obj, ProductModel, this.collection, this.setOptions);

	updateProduct(id: string, obj: ProductModel, useAlert?: AlertType): Promise<void> {
		let setOptions = this.setOptions;
		if (!isNullOrWhitespace(useAlert))
			setOptions.useAlert = useAlert;
		return this.update(id, obj, ProductModel, this.collection, setOptions);
	}

	deleteProduct = (id: string): Promise<void> =>
		this.delete(id, this.collection, this.setOptions);
}