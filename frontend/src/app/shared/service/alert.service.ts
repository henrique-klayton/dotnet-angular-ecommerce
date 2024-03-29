import { Injectable } from '@angular/core';
import {
	MatSnackBar,
	MatSnackBarConfig,
	MatSnackBarRef,
	TextOnlySnackBar
} from '@angular/material/snack-bar';
import { ActionType } from '../enums';
import { IAlertOptions } from '../interfaces';
import { AppInjector } from './injector.service';

@Injectable()
export class AlertService {
	public snackBar: MatSnackBar;

	constructor() {
		this.snackBar = AppInjector.injector.get(MatSnackBar);
	}

	baseAlert = (
		message: string,
		action: string = 'Fechar',
		config?: MatSnackBarConfig,
	): MatSnackBarRef<TextOnlySnackBar> => this.snackBar.open(message, action, config);

	statusAlert(success: boolean, objName: string, options: IAlertOptions) {
		options.action ??= 'Fechar';
		// FIXME Remove non-null assertion
		const [successMsg, errorMsg] = this.defaultMsg(options.type!);
		const message = success
			? `${objName} ${successMsg} com sucesso`
			: `Erro ao ${errorMsg} ${objName.toLowerCase()}`;
		return this.baseAlert(message, options.action, options.config);
	}

	private defaultMsg(type: ActionType) {
		switch (type) {
			case ActionType.CREATE:
				return ['cadastrado', 'cadastrar'];
			case ActionType.UPDATE:
				return ['atualizado', 'atualizar'];
			case ActionType.DELETE:
				return ['removido', 'remover'];
		}
	}
}