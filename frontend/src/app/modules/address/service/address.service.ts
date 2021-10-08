import { Injectable } from '@angular/core';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { AddressFormModel } from '../form/model/address.form.model';

@Injectable()
export class AddressService extends BaseService {
	private _baseRoute = 'Address';
	private _setOptions: ISetOptions = { useAlert: AlertType.STATUS, objName: 'Endereço' };
	constructor() {
		super();
	}

	async fetchCep(cep: string): Promise<AddressFormModel> {
		try {
			const res = await this._http
				.get<AddressFormModel>(`http://viacep.com.br/ws/${cep}/json`)
				.toPromise();
			if (res.erro) {
				this._alert.baseAlert('CEP inválido!');
				throw new Error('CEP inválido!');
			}
			return res;
		} catch (e) {
			this._alert.baseAlert('Erro ao pesquisar o CEP!');
			throw new Error(e);
		}
	}

	fetchData = () => this.get<AddressFormModel>(this._baseRoute);

	fetchAddressById = (cep: string) => this.getById<AddressFormModel>(this._baseRoute, cep)

	insertAddress = (obj: AddressFormModel) => this.post(this._baseRoute, obj);

	deleteAddress = (cep: string) => this.delete(this._baseRoute, cep);
}
