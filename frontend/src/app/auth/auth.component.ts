import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../shared/service/alert.service';
import { FormValidationService } from '../shared/service/form.service';
import { AuthService } from './service/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
	public form: UntypedFormGroup;
	public hide: boolean = true;

	constructor(
		public formValidation: FormValidationService,
		private _authService: AuthService,
		private _fb: UntypedFormBuilder,
		private _router: Router,
		private _alert: AlertService
	) {}

	ngOnInit(): void {
		this.form = this._fb.group({ email: undefined, password: undefined });
	}

	public login() {
		this._authService
			.login(this.form.get('email').value, this.form.get('password').value)
			.then(() => {
				this._router.navigate(['home']);
			})
			.catch((e) => {
				this._alert.baseAlert(e.error.error);
			});
	}
}
