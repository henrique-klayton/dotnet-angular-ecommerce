import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGetOptions } from '../interfaces';
import { AlertService } from './alert.service';
import { AppInjector } from './injector.service';

const DEFAULT_GET_OPTIONS: IGetOptions = {
	idField: 'id'
};

export abstract class BaseService {
	protected _alert: AlertService;
	protected _http: HttpClient;

	constructor() {
		this._alert = AppInjector.injector.get(AlertService);
		this._http = AppInjector.injector.get(HttpClient);
	}

	protected get<T>(
		url: string,
	): Observable<T> {
		return this._http.get<T>(`${environment.baseUrl}/${url}`);
	}

	protected getAll<T>(
		url: string,
	): Observable<T[]> {
		return this.get<T[]>(url);
	}

	protected getById<T>(
		url: string,
		id: string | number,
	): Observable<T> {
		return this.get<T>(`${url}/${id}`);
	}

	protected post<T>(
		url: string,
		obj: any,
	): Promise<T> {
		return this._http.post<T>(`${environment.baseUrl}/${url}`, obj).toPromise();
	}

	protected put<T>(
		url: string,
		id: string | number,
		obj: any,
	): Promise<T> {
		return this._http.put<T>(`${environment.baseUrl}${url}/${id}`, obj).toPromise();
	}

	// TODO Support JSON Patch
	// protected patch<T>(
	// 	url: string,
	// 	obj: any,
	// 	id: string | number
	// ) {
	// 	return this._http.put<T>(url, obj, {
	// 		params: { id }
	// 	});
	// }

	protected delete<T>(
		url: string,
		id: string | number,
	): Promise<T> {
		return this._http.delete<T>(`${environment.baseUrl}${url}/${id}`).toPromise();
	}
}