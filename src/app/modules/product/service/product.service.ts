import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { formatObjectToDocument } from 'src/app/util/functions';
import { ProductFormModel } from '../form/model/product.form.model';
import { ProductModel } from '../model/product.model';

@Injectable()
export class ProductService {
	constructor(private _firestore: AngularFirestore) {}

	public fetchData(): Observable<ProductFormModel[]> {
		return this._firestore.collection<ProductFormModel>('Products').valueChanges({ idField: 'id' });
	}

	public fetchProductById(id: string): Observable<ProductFormModel> {
		return this._firestore.collection<ProductFormModel>('Products').doc(id).get().pipe(
			map(p => p.data())
		);
	}

	public insertOrUpdateProduct(obj: ProductModel, id?: string) {
		if (id) {
			return this.updateProduct(id, obj);
		}
		return this.insertProduct(obj);
	}

	public insertProduct(obj: ProductModel): Promise<void> {
		return this._firestore.collection('Products').doc().set(formatObjectToDocument(obj, ProductModel));
	}

	public updateProduct(id: string, obj: ProductModel): Promise<void> {
		return this._firestore.collection('Products').doc(id).set(formatObjectToDocument(obj, ProductModel));
	}

	public deleteProduct(id: string): Promise<void> {
		return this._firestore.collection('Products').doc(id).delete();
	}
}