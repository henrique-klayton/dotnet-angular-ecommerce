import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { formatFirebaseDate } from 'src/app/utils/functions';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService extends BaseService {
	private baseRoute = 'User';
	private setOptions: ISetOptions = { useAlert: AlertType.STATUS, objName: 'Usuário' };
	constructor(private authService: AuthService) {
		super();
	}

	fetchData = () => this.getAll<UserModel>(this.baseRoute);

	fetchUserById = (id: string) => this.getById<UserModel>(this.baseRoute, id);

	insertUser(obj: UserModel) {
		// FIXME Remove non-null assertion for password
		obj.birthday = formatFirebaseDate(obj.birthday);
		return this.post(this.baseRoute, obj)
			.then(() => this.authService.register(obj.email, obj.password!));
	}

	updateUser(id: string, obj: UserModel) {
		// TODO Update user in firebase auth
		obj.birthday = formatFirebaseDate(obj.birthday);
		return this.put(this.baseRoute, id, obj);
	}

	deleteUser = (id: string) => this.delete(this.baseRoute, id);
}
