import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductFormModel } from '../product/form/model/product.form.model';
import { ProductService } from '../product/service/product.service';
import { CartComponent } from '../cart/cart.component';
import { CartProductModel } from '../cart/model/cart-product.model';

@Component({
	selector: 'app-sales',
	templateUrl: './sales.component.html',
	styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {
	public products: ProductFormModel[];
	public quantity: number;
	private _onDestroy = new Subject<void>();

	constructor(
		private _productService: ProductService,
		private _dialog: MatDialog
	) { }

	ngOnInit(): void {
		this._productService.fetchData()
			.pipe(takeUntil(this._onDestroy))
			.subscribe((res) => this.products = res);
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	openDialog() {
		this._dialog.open(CartComponent, {
			width: '600px'
		});
	}

	addToCart = (product: ProductFormModel) => {
		const quantity = +(document.getElementById(product.id) as HTMLInputElement).value;
		let cartProducts: CartProductModel[] = JSON.parse(localStorage.getItem('cart_products')) ?? [];
		cartProducts.push(CartProductModel.fromProduct(product, quantity));
		localStorage.setItem('cart_products', JSON.stringify(cartProducts));
	}
}
