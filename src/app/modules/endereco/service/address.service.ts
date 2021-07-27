import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/service/base.service';
import { AddressFormModel } from '../form/model/address.form.model';
import { AddressModel } from '../model/address.model';

@Injectable()
export class AddressService extends BaseService {
	private collection = 'Address';
	constructor(private _http: HttpClient) {
		super();
	}

	public fetchCep(cep: string) {
		if (cep === '' && cep === null && cep === undefined)
			return;

		return this._http
			.get<AddressFormModel>(`http://viacep.com.br/ws/${cep}/json`)
			.toPromise();
	}

	fetchData = () =>
		this.getData<AddressFormModel>(this.collection, { idField: 'cep'});

	fetchAddressById = (cep: string) =>
		this.getById<AddressFormModel>(cep, this.collection, { idField: 'cep' })

	insertAddress = (obj: AddressFormModel) =>
		this.create<AddressModel>(obj, AddressModel, this.collection, obj.cep);

	deleteAddress = (cep: string) => this.delete(cep, this.collection);
}
