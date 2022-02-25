export class UserModel {
	constructor(init?: Partial<UserModel>) {
		Object.assign(this, init);
	}

	name: string = undefined;
	password?: string = undefined;
	email: string = undefined;
	phone: string = undefined;
	complement: string = undefined;
	cep: string = undefined;
	type: boolean = true;
	birthday: Date = undefined;
}