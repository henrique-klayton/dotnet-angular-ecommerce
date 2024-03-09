import { AddressModel } from '../../model/address.model';

export class AddressFormModel extends AddressModel {
	// FIXME Remove non-null assertion
	cep: string = undefined!;
	erro?: string;
}