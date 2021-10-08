import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { formatFirebaseDate } from 'src/app/utils/functions';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService extends BaseService {
	private _baseRoute = 'User';
	private _setOptions: ISetOptions = { useAlert: AlertType.STATUS, objName: 'Usuário' }
	constructor(private _authService: AuthService) {
		super();
	}

	fetchData = () => this.get<UserModel>(this._baseRoute);

	fetchUserById = (id: string) => this.getById<UserModel>(this._baseRoute, id);

	insertUser(obj: UserModel) {
		obj.birthday = formatFirebaseDate(obj.birthday);
		return this.post(this._baseRoute, obj)
			.then(() => this._authService.register(obj.email, obj.password));
	}

	updateUser(id: string, obj: UserModel) {
		// TODO Update user in firebase auth
		obj.birthday = formatFirebaseDate(obj.birthday);
		return this.put(this._baseRoute, id, obj);
	}

	deleteUser = (id: string) => this.delete(this._baseRoute, id);
}
