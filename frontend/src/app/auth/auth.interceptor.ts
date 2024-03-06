import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from '../shared/service/alert.service';
import { AuthService } from './service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private auth: AuthService,
		private alert: AlertService,
		private router: Router
	) { }

	intercept(
		req: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		if (this.auth.isTokenExpired() && this.router.url !== '/login') {
			this.auth.logout();
			this.alert.baseAlert('Sessão Expirada!');
			return throwError(new HttpErrorResponse({
				error: 'session expired',
				status: HttpStatusCode.Unauthorized,
				statusText: 'Session expired',
			}));
		}

		return next.handle(req).pipe(
			tap({
				error: (err: HttpErrorResponse) => {
					switch (err.status) {
						case 401:
							this.auth.logout();
							break;
						default:
							break;
					}
				},
			})
		);
	}
}
