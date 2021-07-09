export class ProductModel {
  name: string = undefined;
  description: string = undefined;
  // TODO Price mask
  price: number = undefined;
  // TODO Slider toggle
  active: boolean = undefined;

  constructor(init?: Partial<ProductModel>) {
    Object.assign(this, init);
  }
}