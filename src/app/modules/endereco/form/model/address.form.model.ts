import { AddressModel } from '../../model/address.model';

export class AddressFormModel extends AddressModel {
	cep: string = undefined;
	erro?: string;
}