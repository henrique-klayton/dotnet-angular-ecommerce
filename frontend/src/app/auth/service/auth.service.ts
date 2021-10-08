import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseService } from 'src/app/shared/service/base.service';
import { AuthResponseModel } from '../model/auth-response.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends BaseService {
	constructor(
		private _jwtService: JwtHelperService,
		private _router: Router,
	) {
		super();
	}

	public async login(email: string, password: string): Promise<void> {
		let response = await this.post<AuthResponseModel>('User/Authenticate', { email, password });
		return this.saveToken(response.token);
	}

	public logout(): void {
		this.removeToken();
		this._router.navigateByUrl('login');
	};

	public register = (email: string, password: string) =>
		this.post('Auth/Register', { email, password });

	public isLogged = () => !this._jwtService.isTokenExpired();

	public saveToken = (token: string) => localStorage.setItem('access_token', token);

	public removeToken = () => localStorage.removeItem('access_token');

	// public async updateUserEmail(email: string) {
	// 	let user = await this._fireAuth.currentUser;
	// 	if (user.email !== email)
	// 		user.email = email;
	// }
}
