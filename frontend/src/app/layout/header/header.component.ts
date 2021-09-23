import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	@Input() sidebar: MatSidenav;
	constructor(private _authService: AuthService, private _router: Router) {}

	public logout() {
		this._authService.logout().then(() => {
			this._router.navigate(['login']);
		});
	}
}
