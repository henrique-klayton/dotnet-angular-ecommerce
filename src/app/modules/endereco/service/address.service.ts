import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressFormModel } from '../form/model/address.form.model';
import { AddressModel } from '../model/address.model';

@Injectable()
export class AddressService {
	constructor(
		private _firestore: AngularFirestore,
		private _http: HttpClient
	) {}

	public fetchCep(cep: string) {
		if (cep == '' && cep == null && cep == undefined) {
			return;
		}

		return this._http
			.get<AddressFormModel>(`http://viacep.com.br/ws/${cep}/json`)
			.toPromise();
	}

	public fetchData(): Observable<AddressFormModel[]> {
		return this._firestore.collection<AddressFormModel>('Address').valueChanges();
	}

	public fetchAddressByCep(cep: string): Observable<AddressModel> {
		return this._firestore
			.collection<AddressModel>('Address')
			.doc(cep)
			.get()
			.pipe(map((u) => new AddressModel(u.data())));
	}

	public insertOrUpdateAddress(obj: AddressModel): Promise<void> {
		return this._firestore.collection('Address').doc(obj.cep).set(obj);
	}

	public deleteAddress(cep: string): Promise<void> {
		return this._firestore.collection('Address').doc(cep).delete();
	}
}
