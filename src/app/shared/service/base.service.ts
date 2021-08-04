import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constructable, formatObjectToFirebase } from 'src/app/util/functions';
import { AppInjector } from './injector.service';

export interface IGetOptions {
	idField?: string
}

export class BaseService {
	protected _firestore: AngularFirestore;

	constructor() {
		this._firestore = AppInjector.injector.get(AngularFirestore);
	}
	protected getData<T>(
		col: string,
		options: IGetOptions = { idField: 'id' }
	): Observable<T[]> {
		return this._firestore.collection<T>(col)
			.valueChanges({ idField: options.idField });
	}
	protected getDataOnce<T>(
		col: string,
		options: IGetOptions = { idField: 'id' }
	): Promise<T[]> {
		return this._firestore
			.collection<T>(col)
			.get()
			.pipe(
				map(q => q.docs.map(p => {
					let data = p.data();
					if (options.idField)
						data[options.idField] = p.id;
					return data;
				}))
			)
			.toPromise();
	}
	protected getById<T>(
		id: string,
		col: string,
		options: IGetOptions = { idField: 'id' }
	): Observable<T> {
		return this._firestore
			.collection<T>(col)
			.doc(id)
			.get()
			.pipe(
				map(p => {
					let data = p.data();
					if (options.idField)
						data[options.idField] = p.id;
					return data;
				})
			);
	}
	protected create = <T>(
		obj: T,
		cls: Constructable<T>,
		col: string,
		id?: string
	): Promise<void> =>
		this._firestore.collection(col).doc(id).set(formatObjectToFirebase(obj, cls));
	protected update = <T>(
		id: string,
		obj: Partial<T>,
		cls: Constructable<Partial<T>>,
		col: string
	): Promise<void> =>
		this._firestore.collection(col).doc(id).update(formatObjectToFirebase(obj, cls));
	protected delete = (id: string, col: string): Promise<void> =>
		this._firestore.collection(col).doc(id).delete();
}