export class AddressModel {
  cep: string = undefined;
  logradouro: string = undefined;
  // complemento: string = undefined;
  bairro: string = undefined;
  localidade: string = undefined;
  uf: string = undefined;
  ibge: string = undefined;
  // erro: boolean = undefined;

  constructor(init?: Partial<AddressModel>) {
    Object.assign(this, init);
  }
}