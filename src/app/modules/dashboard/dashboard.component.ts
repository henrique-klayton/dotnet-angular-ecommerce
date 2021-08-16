import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PRODUCT_CATEGORIES } from 'src/app/utils/constants';
import { ProductFormModel } from '../product/form/model/product.form.model';
import { DashboardService } from './service/dashboard.service';

export type CategorizedProducts = { [category: string]: Array<{ name: string, value: number }> };
export type CategoryCardArray = Array<{ name: string, numProducts: number, stockAmount: number }>;

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
	public categories: CategoryCardArray = [];
	public numSales: number = 0;
	public numBranches: number = 0;
	public totalStock: number = 0;
	public categoryEvent = new Subject<string>();
	public categorizedProductsEvent = new Subject<CategorizedProducts>();
	private _onDestroy = new Subject<void>();
	constructor(private _service: DashboardService) { }
	ngOnInit(): void {
		this.subscribeAll();
	}
	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
		this.categoryEvent.complete();
	}
	changeCategory = (category: string) => this.categoryEvent.next(category);

	private subscribeAll() {
		this._service.numSales()
			.pipe(takeUntil(this._onDestroy))
			.subscribe(res => this.numSales = res);

		this._service.numAddress()
			.pipe(takeUntil(this._onDestroy))
			.subscribe(res => this.numBranches = res);

		this._service.fetchProducts()
			.pipe(takeUntil(this._onDestroy))
			.subscribe(res => {
				this.categories = [];
				this.totalStock = 0;
				Object.entries(this.categorizeProducts(res)).map(([key, products]) => {
					const amount = products.reduce((amount, product) => amount = amount + product.value, 0);
					this.categories.push({ name: key, numProducts: products.length, stockAmount: amount });
					this.totalStock += amount;
				});
			});
	}
	private categorizeProducts(products: ProductFormModel[]): CategorizedProducts {
		let categorizedProducts: CategorizedProducts = {};
		PRODUCT_CATEGORIES.slice(1).forEach(category => categorizedProducts[category.name] = []);
		products.forEach(product => {
			const key = PRODUCT_CATEGORIES.slice(1)[product.category].name;
			categorizedProducts[key].push({ name: product.name, value: product.amount });
		});
		this.categorizedProductsEvent.next(categorizedProducts);
		return categorizedProducts;
	}
}
