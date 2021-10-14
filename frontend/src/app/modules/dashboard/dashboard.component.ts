import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PRODUCT_CATEGORIES } from 'src/app/utils/constants';
import { ProductFormModel } from '../product/form/model/product.form.model';
import { TotalsModel } from './model/totals-model';
import { DashboardService } from './service/dashboard.service';
import { CategorizedProducts, CategoryCard } from './utils/interfaces';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
	public categoryCards: CategoryCard[] = [];
	public totals = new TotalsModel();
	public categoryEvent = new Subject<string>();
	public productsEvent = new Subject<CategorizedProducts>();
	private _onDestroy = new Subject<void>();
	constructor(private _service: DashboardService) { }
	ngOnInit(): void {
		this._subscribeAll();
	}
	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
		this.categoryEvent.complete();
		this.productsEvent.complete();
	}
	changeCategory(category: CategoryCard) {
		this.categoryEvent.next(category.name);
		this.categoryCards.map(i => i.active = false);
		category.active = true;
	}

	private _subscribeAll() {
		this._service.fetchTotals().subscribe(totals => this.totals = totals);
		// this._service.numSales()
		// 	.pipe(takeUntil(this._onDestroy))
		// 	.subscribe(res => this.numSales = res);

		// this._service.numAddress()
		// 	.pipe(takeUntil(this._onDestroy))
		// 	.subscribe(res => this.numBranches = res);

		this._service.fetchProducts()
			.pipe(takeUntil(this._onDestroy))
			.subscribe(products => {
				this._getCategorizedProducts(products);
				this._setNewActiveCard();
				this._getTotalStock();
			});
	}
	private _categorizeProducts(products: ProductFormModel[]): CategorizedProducts {
		const categories = PRODUCT_CATEGORIES.slice(1);
		let categorizedProducts: CategorizedProducts = {};

		categories.forEach(category => categorizedProducts[category.name] = []);
		products.forEach(product => {
			const key = categories[product.category].name;
			categorizedProducts[key].push({ name: product.name, value: product.stockAmount });
		});
		return categorizedProducts;
	}
	private _getCategorizedProducts(products: ProductFormModel[]) {
		this.categoryCards = [];
		const categorizedProducts = this._categorizeProducts(products);
		this.productsEvent.next(categorizedProducts);

		Object.entries(categorizedProducts).map(([key, products]) => {
			const amount = products.reduce((amount, product) => amount + product.value, 0);
			this.categoryCards.push({
				name: key,
				numProducts: products.length,
				stockAmount: amount,
				active: false,
			});
		});
	}
	private _getTotalStock() {
		this.totals.numProductsStock = Object.values(this.categoryCards)
			.reduce((amount, card) => amount + card.stockAmount, 0);
	}
	private _setNewActiveCard() {
		const activeCardName = this.categoryCards.find(card => card.active)?.name;
		if (activeCardName) {
			let card = this.categoryCards.find(card => card.name === activeCardName);
			if (card !== undefined)
				return card.active = true;
		}
		this.changeCategory(this.categoryCards[2]);
	}
}
