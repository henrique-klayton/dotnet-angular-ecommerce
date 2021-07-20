import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductFormModel } from '../product/form/model/product.form.model';
import { ProductService } from '../product/service/product.service';

@Component({
	selector: 'app-sales',
	templateUrl: './sales.component.html',
	styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {
	public products: ProductFormModel[];

	private _onDestroy = new Subject<void>();

	constructor(private _productService: ProductService) { }

	ngOnInit(): void {
		this._productService.fetchData()
			.pipe(takeUntil(this._onDestroy))
			.subscribe((res) => this.products = res);
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}
}
