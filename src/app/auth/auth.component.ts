import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
	public form: FormGroup;
	public hide: boolean = true;

	constructor(
		public formValidation: FormValidationService,
		private _authService: AuthService,
		private _fb: FormBuilder,
		private _router: Router,
		private _alert: AlertService
	) {}

	ngOnInit(): void {
		this.form = this._fb.group({ email: undefined, password: undefined });
	}

	public login() {
		this._authService
			.login(this.form.value)
			.then(() => {
				this._router.navigate(['home']);
			})
			.catch((e) => {
				let errorMessage: string;
				switch (e.code) {
					case 'auth/invalid-email':
						errorMessage = 'Email inválido!';
						break;
					case 'auth/wrong-password':
					case 'auth/user-not-found':
						errorMessage = 'Usuário ou Senha incorreta!';
						break;
					default:
						errorMessage = 'Erro ao realizar o login!';
						break;
				}
				this._alert.baseAlert(errorMessage);
			});
	}
}
