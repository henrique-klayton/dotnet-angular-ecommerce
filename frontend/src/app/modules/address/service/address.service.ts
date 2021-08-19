import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertType } from 'src/app/shared/enums';
import { ISetOptions } from 'src/app/shared/interfaces';
import { BaseService } from 'src/app/shared/service/base.service';
import { AddressFormModel } from '../form/model/address.form.model';
import { AddressModel } from '../model/address.model';

@Injectable()
export class AddressService extends BaseService {
	private collection = 'Address';
	private setOptions: ISetOptions = { useAlert: AlertType.STATUS, objName: 'Endereço' };
	constructor(private _http: HttpClient) {
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

	fetchData = () =>
		this.getData<AddressFormModel>(this.collection, { idField: 'cep'});

	fetchAddressById = (cep: string) =>
		this.getById<AddressFormModel>(cep, this.collection, { idField: 'cep' })

	insertAddress = (obj: AddressFormModel) =>
		this.create(obj, AddressModel, this.collection, this.setOptions, obj.cep);

	deleteAddress = (cep: string) => this.delete(cep, this.collection, this.setOptions);
}
