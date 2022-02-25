import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/shared/service/base.service';
import { AuthModel } from '../model/auth.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends BaseService {
	private _auth: BehaviorSubject<AuthModel>;

	constructor(
		private _router: Router,
	) {
		super();

		this._auth = new BehaviorSubject<AuthModel>(undefined);
	}

	public async login(email: string, password: string): Promise<void> {
		this.auth = await this.post<AuthModel>('User/Authenticate', { email, password });
	}

	public logout(): void {
		this.post<void>('User/Logout');
		this.clearSession();
		this._router.navigateByUrl('login');
	};

	public register = (email: string, password: string) =>
		this.post('Auth/Register', { email, password });

	public isLogged = () => !this.isTokenExpired();

	public isTokenExpired = () => this.auth && this.auth.refreshToken
		&& this.auth.refreshToken.expirationDate.getTime() < Date.now();

	private clearSession = () => this.auth = undefined;

	get auth(): AuthModel {
		return this._auth.value;
	}

	set auth(value: AuthModel) {
		this._auth.next(value);
	}
}
