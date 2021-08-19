import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { formatFirebaseDate } from 'src/app/utils/functions';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService extends BaseService {
	private _collection = 'Users';
	private _setOptions: ISetOptions = { useAlert: AlertType.STATUS, objName: 'Usuário' }
	constructor(private _authService: AuthService) {
		super();
	}

	fetchData = () => this.getData<UserModel>(this._collection);

	fetchUserById = (id: string) => this.getById<UserModel>(id, this._collection);

	insertUser(obj: UserModel) {
		obj.birthday = formatFirebaseDate(obj.birthday);
		return this.create(obj, UserModel, this._collection, this._setOptions)
			.then(() => this._authService.register(obj.email, obj.password));
	}

	updateUser(id: string, obj: UserModel) {
		// TODO Update user in firebase auth
		obj.birthday = formatFirebaseDate(obj.birthday);
		return this.update(id, obj, UserModel, this._collection, this._setOptions);
	}

	deleteUser = (id: string) => this.delete(id, this._collection, this._setOptions)
}
