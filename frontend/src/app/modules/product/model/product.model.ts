export class ProductModel {
	id: number = undefined;
	name: string = undefined;
	description: string = undefined;
	costPrice: string | number = undefined;
	salePrice: string | number = undefined;
	status: boolean = false;
	category: string = undefined;
	categoryId: number = undefined;
	image: string = undefined;
	stockAmount: number = undefined;

	constructor(init?: Partial<ProductModel>) {
		Object.assign(this, init);
	}
}