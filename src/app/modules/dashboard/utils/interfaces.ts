export interface CategorizedProducts {
	[category: string]: Array<{ name: string, value: number }>;
}

export interface CategoryCard {
	name: string;
	numProducts: number;
	stockAmount: number;
	active: boolean;
}
