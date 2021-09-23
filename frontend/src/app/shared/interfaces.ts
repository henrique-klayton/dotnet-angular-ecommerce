import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActionType, AlertType } from './enums';

export type IGetOptions = IBaseGetOptions;
export type ISetOptions = IBaseSetOptions & IAlertConfig;
export type IAlertConfig = INoAlert | IBaseAlertConfig | IStatusAlertConfig;

export interface IAlertOptions {
	action?: string;
	type?: ActionType;
	config?: MatSnackBarConfig;
}
export interface IBaseGetOptions {
	idField?: string;
}
export interface IBaseSetOptions { }
export interface INoAlert {
	useAlert: AlertType.NONE;
}
export interface IBaseAlertConfig {
	useAlert: AlertType.BASE;
	errorMsg: string;
	successMsg: string;
	alertOptions?: IAlertOptions;
}
export interface IStatusAlertConfig {
	useAlert: AlertType.STATUS;
	objName: string;
	alertOptions?: IAlertOptions;
}