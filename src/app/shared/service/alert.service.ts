import { Injectable } from '@angular/core';
import {
	MatSnackBar,
	MatSnackBarConfig,
	MatSnackBarRef,
	TextOnlySnackBar
} from '@angular/material/snack-bar';
import { AppInjector } from './injector.service';

export interface IAlertOptions {
	action?: string;
	config?: MatSnackBarConfig;
}

const DEFAULT_OPTIONS: IAlertOptions = {
	action: 'OK'
};

@Injectable()
export class AlertService {
	public _snackBar: MatSnackBar;

	constructor() {
		this._snackBar = AppInjector.injector.get(MatSnackBar);
	}

	baseAlert = (
		message: string,
		options = DEFAULT_OPTIONS,
	): MatSnackBarRef<TextOnlySnackBar> =>
		this._snackBar.open(message, options.action, options.config);

	statusAlert(success: boolean, objName: string, options?: IAlertOptions) {
		const message = success
			? `${objName} cadastrado com sucesso`
			: `Erro ao cadastrar ${objName}`;
		return this.baseAlert(message, options);
	}
}