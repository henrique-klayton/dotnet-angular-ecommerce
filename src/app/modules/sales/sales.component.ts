import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/service/alert.service';
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
	public amount: number;
	private _onDestroy = new Subject<void>();

	constructor(
		private _alert: AlertService,
		private _dialog: MatDialog,
		private _productService: ProductService
	) { }

	ngOnInit(): void {
		this.form = [];
		this._productService.fetchData()
			.pipe(takeUntil(this._onDestroy))
			.subscribe((res) => {
				res.forEach(() => this.form.push(
					new FormGroup({ amount: new FormControl(undefined, Validators.min(1)) })
				));
				this.products = res;
			});
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	openDialog(): void {
		this._dialog.open(CartComponent, {
			width: '600px'
		});
	}

	addToCart(product: ProductFormModel, formIndex: number): void {
		const amount = +this.form[formIndex].get('amount').value;
		let cart: CartProductModel[] =
			JSON.parse(localStorage.getItem('cart_products')) ?? [];
		let index = cart.findIndex(v => v.id === product.id);

		if (index === -1) {
			if (this.hasEnoughStock(product.amount, amount, 0)) {
				cart.push(CartProductModel.fromProduct(product, amount));
				localStorage.setItem('cart_products', JSON.stringify(cart));
				this._alert.baseAlert('Produto adicionado ao carrinho!');
				return;
			};
		} else {
			const newAmount = cart[index].amount + amount;
			if (this.hasEnoughStock(product.amount, newAmount, cart[index].amount)) {
				cart[index].amount = newAmount;
				cart[index].price += amount * product.sale_price;
				localStorage.setItem('cart_products', JSON.stringify(cart));
				this._alert.baseAlert('Produto adicionado ao carrinho!');
			};
		}
	}

	private hasEnoughStock(
		stockAmount: number,
		saleAmount: number,
		cartAmount: number
	): boolean {
		if (saleAmount >= stockAmount) {
			this._alert.baseAlert(
				`Não há quantidade suficiente em estoque!
				Restam ${stockAmount - cartAmount} unidades desse produto.`
			);
			return false;
		}
		return true;
	}
}
