import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
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

	private onDestroy = new Subject<void>();

	constructor(private service: DashboardService) { }

	ngOnInit(): void {
		this.subscribeAll();
	}

	ngOnDestroy(): void {
		this.onDestroy.next();
		this.onDestroy.complete();
		this.categoryEvent.complete();
		this.productsEvent.complete();
	}

	changeCategory(category: CategoryCard) {
		this.categoryEvent.next(category.name);
		this.categoryCards.map(i => i.active = false);
		category.active = true;
	}

	private subscribeAll() {
		this.service.fetchTotals().subscribe(totals => this.totals = totals);
		this.service.fetchProducts()
			.pipe(
				takeUntil(this.onDestroy),
				switchMap(products => this.categorizeProducts(products))
			)
			.subscribe(products => {
				this.getCardCategories(products);
				this.productsEvent.next(products);
				this.setNewActiveCard();
			});
	}

	private categorizeProducts(products: ProductFormModel[]): Observable<CategorizedProducts> {
		return this.service.fetchCategories().pipe(map(categories => {
			let categorizedProducts: CategorizedProducts = {};

			categories.forEach(category => categorizedProducts[category.name] = []);
			products.forEach(product => {
				// FIXME Remove non-null assertion
				const category = categories.find(category => product.categoryId === category.id)!.name;
				categorizedProducts[category].push({ name: product.name, value: product.stockAmount });
			});

			return categorizedProducts;
		}));
	}

	private getCardCategories(products: CategorizedProducts) {
		this.categoryCards = Object.entries(products).map(([key, products]) => ({
			name: key,
			numProducts: products.length,
			stockAmount: products.reduce((amount, product) => amount + product.value, 0),
			active: false,
		}));
	}

	private setNewActiveCard() {
		const activeCardName = this.categoryCards.find(card => card.active)?.name;
		if (activeCardName) {
			let card = this.categoryCards.find(card => card.name === activeCardName);
			if (card !== undefined)
				return card.active = true;
		}
		this.changeCategory(this.categoryCards[2]);
	}
}
