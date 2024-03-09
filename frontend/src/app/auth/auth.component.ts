import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../shared/service/alert.service';
import { FormValidationService } from '../shared/service/form.service';
import { AuthService } from './service/auth.service';
import { isNullOrWhitespace } from '../utils/functions';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
	// TODO Use typed form
	public form!: UntypedFormGroup;
	public hide: boolean = true;

	constructor(
		public formValidation: FormValidationService,
		private authService: AuthService,
		private fb: UntypedFormBuilder,
		private router: Router,
		private alert: AlertService
	) { }

	ngOnInit(): void {
		this.form = this.fb.group({ email: undefined, password: undefined });
	}

	public login() {
		this.authService
			.login(this.form.get('email')!.value, this.form.get('password')!.value)
			.then(() => {
				this.router.navigate(['home']);
			})
			.catch((e) => {
				let message = e?.error?.error;
				if (isNullOrWhitespace(message))
					message = 'Erro desconhecido ao realizar login';
				this.alert.baseAlert(e.error.error);
			});
	}
}
