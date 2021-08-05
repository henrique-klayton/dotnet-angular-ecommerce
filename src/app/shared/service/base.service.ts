import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constructable, formatObjectToFirebase } from 'src/app/util/functions';
import { AlertService, IAlertOptions } from './alert.service';
import { AppInjector } from './injector.service';

export type ISetOptions = IBaseSetOptions & IAlertConfig;
export type IAlertConfig = INoAlert | IBaseAlertConfig | IStatusAlertConfig;

export interface IGetOptions {
	idField?: string;
}
export interface IBaseSetOptions { }
export interface INoAlert {
	useAlert: 'none';
}
export interface IBaseAlertConfig {
	useAlert: 'base';
	errorMsg: string;
	successMsg: string;
	alertOptions?: IAlertOptions;
}
export interface IStatusAlertConfig {
	useAlert: 'status';
	objName: string;
	alertOptions?: IAlertOptions;
}

const DEFAULT_GET_OPTIONS: IGetOptions = {
	idField: 'id'
};

export class BaseService {
	protected _firestore: AngularFirestore;
	public alertService: AlertService;

	constructor() {
		this._firestore = AppInjector.injector.get(AngularFirestore);
		this.alertService = AppInjector.injector.get(AlertService);
	}
	protected getData<T>(
		col: string,
		options = DEFAULT_GET_OPTIONS
	): Observable<T[]> {
		return this._firestore.collection<T>(col)
			.valueChanges(options.idField && { idField: options.idField });
	}
	protected getDataOnce<T>(
		col: string,
		options = DEFAULT_GET_OPTIONS
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
		options = DEFAULT_GET_OPTIONS
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
	protected create<T>(
		obj: T,
		cls: Constructable<T>,
		col: string,
		options: ISetOptions,
		id?: string,
	): Promise<void> {
		return this._firestore.collection(col).doc(id)
			.set(formatObjectToFirebase(obj, cls))
			.then(() => this.showAlert(true, options))
			.catch(() => this.showAlert(false, options));
	}
	protected update<T>(
		id: string,
		obj: Partial<T>,
		cls: Constructable<Partial<T>>,
		col: string,
		options: ISetOptions,
	): Promise<void> {
		return this._firestore.collection(col).doc(id)
			.update(formatObjectToFirebase(obj, cls))
			.then(() => this.showAlert(true, options))
			.catch(() => this.showAlert(false, options));
	}
	protected delete(
		id: string,
		col: string,
		options: ISetOptions,
	): Promise<void> {
		return this._firestore.collection(col).doc(id)
			.delete()
			.then(() => this.showAlert(true, options))
			.catch(() => this.showAlert(false, options));
	}

	private showAlert(success: boolean, options: ISetOptions) {
		switch (options.useAlert) {
			case 'base':
				this.alertService.baseAlert(
					success ? options.successMsg : options.errorMsg,
					options.alertOptions
				);
				break;
			case 'status':
				this.alertService.statusAlert(success, options.objName, options.alertOptions);
				break;
		}
	}
}