import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constructable, formatObjectToFirebase } from 'src/app/util/functions';
import { AppInjector } from './injector.service';

export interface IGetOptions {
	idField?: string
}

interface IBaseService {
	getData<T>(col: string, options?: IGetOptions): Observable<T[]>;
	getById<T>(id: string, col: string, options?: IGetOptions): Observable<T>;
	create<T>(obj: T, cls: Constructable<T>, col: string): Promise<void>;
	update<T>(id: string, obj: T, cls: Constructable<T>, col: string): Promise<void>;
	delete(id: string, collection: string): Promise<void>;
}

export class BaseService implements IBaseService {
	protected _firestore: AngularFirestore;

	constructor() {
		this._firestore = AppInjector.injector.get(AngularFirestore);
	}
	getData<T>(
		col: string,
		options: IGetOptions = { idField: 'id' }
	): Observable<T[]> {
		return this._firestore.collection<T>(col).valueChanges({ idField: options.idField });
	}
	getById<T>(
		id: string,
		col: string,
		options: IGetOptions = { idField: 'id' }
	): Observable<T> {
		return this._firestore.collection<T>(col).doc(id).get().pipe(map(p => {
			let data = p.data();
			if (options.idField)
				data[options.idField] = p.id;
			return data;
		}));
	}
	create = <T>(obj: T, cls: Constructable<T>, col: string, id?: string): Promise<void> =>
		this._firestore.collection(col).doc(id).set(formatObjectToFirebase(obj, cls));
	update = <T>(id: string, obj: T, cls: Constructable<T>, col: string): Promise<void> =>
		this._firestore.collection(col).doc(id).set(formatObjectToFirebase(obj, cls));
	delete = (id: string, col: string): Promise<void> =>
		this._firestore.collection(col).doc(id).delete();
}