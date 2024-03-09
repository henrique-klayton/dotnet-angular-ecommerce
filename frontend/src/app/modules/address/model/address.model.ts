export class AddressModel {
	// FIXME Remove non-null assertions
	logradouro: string = undefined!;
	bairro: string = undefined!;
	localidade: string = undefined!;
	uf: string = undefined!;

	constructor(init?: Partial<AddressModel>) {
		Object.assign(this, init);
	}
}