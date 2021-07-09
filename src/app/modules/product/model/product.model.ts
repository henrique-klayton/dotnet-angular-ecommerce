export class ProductModel {
  name: string = undefined;
  description: string = undefined;
  price: number = undefined;
  active: boolean = false;

  constructor(init?: Partial<ProductModel>) {
    Object.assign(this, init);
  }
}