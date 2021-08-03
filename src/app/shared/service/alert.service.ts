import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppInjector } from './injector.service';

@Injectable()
export class AlertService {
	public _snackBar: MatSnackBar;

	constructor() {
		this._snackBar = AppInjector.injector.get(MatSnackBar);
	}

	successAlert(item: string, success: boolean, action: string = 'OK') {
		const message = success
			? `${item} cadastrado com sucesso`
			: `Erro ao cadastrar ${item}`;
		return this._snackBar.open(message, action);
	}
}