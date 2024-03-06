import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/shared/service/base.service';
import { JsonSerializer } from 'typescript-json-serializer';
import { AuthModel } from '../model/auth.model';

export const APP_USER_STORAGE = 'App-User-Auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends BaseService {
	private _auth: BehaviorSubject<AuthModel | null>;
	private serializer = new JsonSerializer();

	get auth(): AuthModel | null {
		return this._auth.value;
	}

	set auth(value: AuthModel | null) {
		this._auth.next(value);
	}

	constructor(
		private router: Router,
	) {
		super();

		this._auth = new BehaviorSubject<AuthModel | null>(this.getSession());
		this._auth.subscribe(value => this.setSession(value));
	}

	public async login(email: string, password: string): Promise<void> {
		this.auth = this.serializer.deserializeObject(
			await this.post<AuthModel>('User/Authenticate', { email, password }),
			AuthModel
		);
	}

	public register = (email: string, password: string) => this.post(
		'Auth/Register',
		{ email, password }
	);

	public logout(): void {
		this.clearSession();
		this.post<void>('User/Logout');
		this.router.navigateByUrl('login');
	};

	// TODO Use refresh token
	// public refreshToken(): void { }

	public isLogged = () => !this.isTokenExpired();

	public isTokenExpired = () => this.auth == null
		|| this.auth.accessTokenExpiration == null
		|| this.auth.accessTokenExpiration.isBefore(moment());

	// TODO Use refresh token
	// public isRefreshTokenExpired = () => this.auth == null
	// 	|| this.auth.refreshTokenExpiration == null
	// 	|| this.auth.refreshTokenExpiration.isBefore(moment());

	public clearSession = (): void => this.auth = null;

	private getSession(): AuthModel | null {
		const storageItem = localStorage.getItem(APP_USER_STORAGE);
		if (storageItem == null) return null;

		return this.serializer.deserializeObject(
			JSON.parse(storageItem),
			AuthModel,
		);
	}

	private setSession(model: AuthModel) {
		if (model != null) {
			localStorage.setItem(
				APP_USER_STORAGE,
				JSON.stringify(this.serializer.serialize(model)),
			);
		}
	}
}
