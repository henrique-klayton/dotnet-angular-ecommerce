import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { BaseService } from 'src/app/shared/service/base.service';
import { formatFirebaseDate } from 'src/app/util/functions';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService extends BaseService {
	private collection = 'Users';
	constructor(private _authService: AuthService) {
		super();
	}

	fetchData = () => this.getData<UserModel>(this.collection);

	fetchUserById = (id: string) => this.getById<UserModel>(id, this.collection);

	insertUser(obj: UserModel) {
		obj.birthday = formatFirebaseDate(obj.birthday);
		return this.create(obj, UserModel, this.collection)
			.then(() => this._authService.register(obj.email, obj.password));
	}

	updateUser(id: string, obj: UserModel) {
		// TODO Update user in firebase auth
		obj.birthday = formatFirebaseDate(obj.birthday);
		return this.update(id, obj, UserModel, this.collection);
	}

	deleteUser = (id: string) => this.delete(id, this.collection)
}
