import { Injectable } from '@angular/core';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { AddressFormModel } from '../form/model/address.form.model';

@Injectable()
export class AddressService extends BaseService {
	private baseRoute = 'Address';
	private setOptions: ISetOptions = { useAlert: AlertType.STATUS, objName: 'Endereço' };
	constructor() {
		super();
	}

	async fetchCep(cep: string): Promise<AddressFormModel> {
		try {
			const res = await this.http
				.get<AddressFormModel>(`http://viacep.com.br/ws/${cep}/json`)
				.toPromise();
			if (res.erro) {
				this.alert.baseAlert('CEP inválido!');
				throw new Error('CEP inválido!');
			}
			return res;
		} catch (e: any) {
			this.alert.baseAlert('Erro ao pesquisar o CEP!');
			throw new Error(e);
		}
	}

	fetchData = () => this.getAll<AddressFormModel>(this.baseRoute);
	fetchAddressById = (cep: string) => this.getById<AddressFormModel>(this.baseRoute, cep);
	insertAddress = (obj: AddressFormModel) => this.post(this.baseRoute, obj);
	deleteAddress = (cep: string) => this.delete(this.baseRoute, cep);
}
