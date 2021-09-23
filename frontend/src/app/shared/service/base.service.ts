import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constructable, formatObjectToFirebase } from 'src/app/utils/functions';
import { ActionType, AlertType } from '../enums';
import { IGetOptions, ISetOptions } from '../interfaces';
import { AlertService } from './alert.service';
import { AppInjector } from './injector.service';

const DEFAULT_GET_OPTIONS: IGetOptions = {
	idField: 'id'
};

export abstract class BaseService {
	protected _firestore: AngularFirestore;
	protected _alert: AlertService;

	constructor() {
		this._firestore = AppInjector.injector.get(AngularFirestore);
		this._alert = AppInjector.injector.get(AlertService);
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
		if (options.useAlert === AlertType.STATUS) {
			options.alertOptions ??= {};
			options.alertOptions.type = ActionType.CREATE;
		}
		return this._firestore.collection(col).doc(id)
			.set(formatObjectToFirebase(obj, cls))
			.then(() => this._showAlert(true, options))
			.catch(() => this._showAlert(false, options));
	}
	protected update<T>(
		id: string,
		obj: Partial<T>,
		cls: Constructable<Partial<T>>,
		col: string,
		options: ISetOptions,
	): Promise<void> {
		if (options.useAlert === AlertType.STATUS) {
			options.alertOptions ??= {};
			options.alertOptions.type = ActionType.UPDATE;
		}
		return this._firestore.collection(col).doc(id)
			.update(formatObjectToFirebase(obj, cls))
			.then(() => this._showAlert(true, options))
			.catch(() => this._showAlert(false, options));
	}
	protected delete(
		id: string,
		col: string,
		options: ISetOptions,
	): Promise<void> {
		if (options.useAlert === AlertType.STATUS) {
			options.alertOptions ??= {};
			options.alertOptions.type = ActionType.DELETE;
		}
		return this._firestore.collection(col).doc(id)
			.delete()
			.then(() => this._showAlert(true, options))
			.catch(() => this._showAlert(false, options));
	}

	private _showAlert(success: boolean, options: ISetOptions) {
		switch (options.useAlert) {
			case AlertType.BASE:
				this._alert.baseAlert(
					success ? options.successMsg : options.errorMsg,
					options.alertOptions.action,
					options.alertOptions.config
				);
				break;
			case AlertType.STATUS:
				this._alert.statusAlert(success, options.objName, options.alertOptions);
				break;
		}
	}
}