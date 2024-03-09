import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGetOptions } from '../interfaces';
import { AlertService } from './alert.service';
import { AppInjector } from './injector.service';

const DEFAULT_GET_OPTIONS: IGetOptions = {};

export abstract class BaseService {
	protected alert: AlertService;
	protected http: HttpClient;

	constructor() {
		this.alert = AppInjector.injector.get(AlertService);
		this.http = AppInjector.injector.get(HttpClient);
	}

	protected get<T>(
		url: string,
	): Observable<T> {
		return this.http.get<T>(`${environment.baseUrl}/${url}`, { withCredentials: true });
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
		obj?: any,
	): Promise<T> {
		return this.http.post<T>(
			`${environment.baseUrl}/${url}`,
			obj,
			{ withCredentials: true }
		).toPromise();
	}

	protected put<T>(
		url: string,
		id: string | number,
		obj?: any,
	): Promise<T> {
		return this.http.put<T>(
			`${environment.baseUrl}${url}/${id}`,
			obj,
			{ withCredentials: true }
		).toPromise();
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
		return this.http.delete<T>(
			`${environment.baseUrl}${url}/${id}`,
			{ withCredentials: true }
		).toPromise();
	}
}