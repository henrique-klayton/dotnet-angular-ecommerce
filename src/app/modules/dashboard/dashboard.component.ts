import { Component, OnDestroy, OnInit } from '@angular/core';
import { ECharts } from 'echarts';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PRODUCT_CATEGORIES } from 'src/app/utils/constants';
import { ProductFormModel } from '../product/form/model/product.form.model';
import { DashboardService } from './service/dashboard.service';
import { ProductChartOptions, SaleChartOptions } from './utils/chart-options';

export type CategorizedProducts = { [category: string]: Array<{ name: string, value: number }> };
export type CardCategories = Array<{ name: string, numProducts: number, stockAmount: number }>;

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
	private _onDestroy = new Subject<void>();

	public isLoading: boolean = false;
	public productCategory: string = 'Alimentos';
	public categories: CardCategories = [];
	public saleChartOptions = SaleChartOptions;
	public productChartOptions = ProductChartOptions;
	public numSales: number = 0;
	public numBranches: number = 0;
	public totalStock: number = 0;

	public categoryEvent = new Subject<string>();
	constructor(private _service: DashboardService) { }
	ngOnInit(): void {
		this.subscribeAll();
	}
	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
		this.categoryEvent.complete();
	}
	fetchSales = (): Observable<number[]> => this._service.fetchSales();
	fetchProducts = (): Observable<ProductFormModel[]> => this._service.fetchProducts();
	setSaleChartData = (chart: ECharts, data: number[]) => chart.setOption({ series: [{ data }] });
	setProductChartData = (chart: ECharts, data: ProductFormModel[], category: string) => {
		const categorized_products = this.categorizeProducts(data);
		const products = categorized_products[category];
		const legend = products.map(({ name }) => name);
		chart.setOption({
			legend: { data: legend },
			series: [{ data: products }],
		});
	}
	changeCategory(category: string) {
		this.productCategory = category;
		this.categoryEvent.next(category);
	}

	private subscribeAll() {
		this._service.numSales()
			.pipe(takeUntil(this._onDestroy))
			.subscribe(res => this.numSales = res);

		this._service.numAddress()
			.pipe(takeUntil(this._onDestroy))
			.subscribe(res => this.numBranches = res);

		this.fetchProducts()
			.pipe(takeUntil(this._onDestroy))
			.subscribe(res => {
				let categories: CardCategories = [];
				let totalStock = 0;
				Object.entries(this.categorizeProducts(res)).map(([key, products]) => {
					const amount = products.reduce((amount, product) => amount = amount + product.value, 0);
					categories.push({ name: key, numProducts: products.length, stockAmount: amount });
					totalStock += amount;
				});
				this.totalStock = totalStock;
				this.categories = categories;
			});
	}
	private categorizeProducts(products: ProductFormModel[]): CategorizedProducts {
		let categories: CategorizedProducts = {};
		PRODUCT_CATEGORIES.slice(1).forEach(category => categories[category.name] = []);
		products.forEach(product => {
			const key = PRODUCT_CATEGORIES.slice(1)[product.category].name;
			categories[key].push({ name: product.name, value: product.amount });
		});
		return categories;
	}
}
