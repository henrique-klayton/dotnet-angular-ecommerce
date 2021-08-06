import { Injectable } from '@angular/core';
import {
	MatSnackBar,
	MatSnackBarConfig,
	MatSnackBarRef,
	TextOnlySnackBar
} from '@angular/material/snack-bar';
import { AppInjector } from './injector.service';

export enum ActionType {
	CREATE,
	UPDATE,
	DELETE,
}

export interface IAlertOptions {
	action?: string;
	type?: ActionType;
	config?: MatSnackBarConfig;
}

@Injectable()
export class AlertService {
	public _snackBar: MatSnackBar;

	constructor() {
		this._snackBar = AppInjector.injector.get(MatSnackBar);
	}

	baseAlert = (
		message: string,
		action: string = 'Fechar',
		config?: MatSnackBarConfig,
	): MatSnackBarRef<TextOnlySnackBar> => this._snackBar.open(message, action, config);

	statusAlert(success: boolean, objName: string, options: IAlertOptions) {
		options.action ??= 'Fechar';
		const [successMsg, errorMsg] = this.defaultMsg(options.type);
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
				return ['deletado', 'deletar'];
		}
	}
}