import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/service/base.service';
import { ProductFormModel } from '../form/model/product.form.model';
import { ProductModel } from '../model/product.model';

@Injectable()
export class ProductService extends BaseService {
	private collection = 'Products';
	constructor() {
		super();
	}

	fetchData = () => this.getData<ProductFormModel>(this.collection);
	fetchDataOnce = () => this.getDataOnce<ProductFormModel>(this.collection);
	fetchProductById = (id: string) => this.getById<ProductModel>(id, this.collection);

	insertOrUpdateProduct = (obj: ProductModel, id?: string) =>
		id ? this.updateProduct(id, obj) : this.insertProduct(obj);

	insertProduct = (obj: ProductModel): Promise<void> =>
		this.create(obj, ProductModel, this.collection);

	updateProduct = (id: string, obj: ProductModel): Promise<void> =>
		this.update(id, obj, ProductModel, this.collection);

	deleteProduct = (id: string): Promise<void> => this.delete(id, this.collection);
}