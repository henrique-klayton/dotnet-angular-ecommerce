import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartComponent } from '../cart/cart.component';
import { CartProductModel } from '../cart/model/cart-product.model';
import { ProductFormModel } from '../product/form/model/product.form.model';
import { ProductService } from '../product/service/product.service';

@Component({
	selector: 'app-sales',
	templateUrl: './sales.component.html',
	styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {
	public form: FormGroup[];
	public products: ProductFormModel[];
	public quantity: number;
	private _onDestroy = new Subject<void>();

	constructor(
		private _productService: ProductService,
		private _dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.form = [];
		this._productService.fetchData()
			.pipe(takeUntil(this._onDestroy))
			.subscribe((res) => {
				res.forEach(() => this.form.push(
					new FormGroup({ quantity: new FormControl(undefined, Validators.min(1)) })
				));
				this.products = res;
			});
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

	addToCart(product: ProductFormModel, formIndex: number) {
		const quantity = +this.form[formIndex].get('quantity').value;
		let cart: CartProductModel[] =
			JSON.parse(localStorage.getItem('cart_products')) ?? [];
		let index = cart.findIndex(v => v.id === product.id);

		if (index === -1) {
			cart.push(CartProductModel.fromProduct(product, quantity));
		} else {
			cart[index].quantity += quantity;
			cart[index].price += quantity * product.sale_price;
		}
		localStorage.setItem('cart_products', JSON.stringify(cart));
	}
}
