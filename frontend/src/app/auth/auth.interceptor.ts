import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AlertService } from '../shared/service/alert.service';
import { AuthService } from './service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(
		private _auth: AuthService,
		private _alert: AlertService,
		private _jwtService: JwtHelperService,
		private _router: Router,
	) { }

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (this._jwtService.isTokenExpired() && this._router.url !== '/login') {
			this._auth.logout();
			this._alert.baseAlert('Sessão Expirada!');
		}

		return next.handle(req);
	}
}
