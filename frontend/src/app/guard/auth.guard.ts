import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private _authService: AuthService, private _router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		// eslint-disable-next-line no-console
		console.log(route);
		if (!this._authService.isLogged()) {
			return this._router.navigate(['login']);
		}
		return true;
	}
}
