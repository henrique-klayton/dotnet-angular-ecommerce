export class AddressModel {
  cep: string = undefined;
  logradouro: string = undefined;
  bairro: string = undefined;
  localidade: string = undefined;
  uf: string = undefined;

  constructor(init?: Partial<AddressModel>) {
    Object.assign(this, init);
  }
}