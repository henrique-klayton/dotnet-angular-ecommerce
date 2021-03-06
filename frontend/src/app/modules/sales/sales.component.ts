import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/service/alert.service';
import { isNullOrUndefined } from 'src/app/utils/functions';
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
	public forms: UntypedFormGroup[];
	public products: ProductFormModel[];
	private _onDestroy = new Subject<void>();

	constructor(
		private _alert: AlertService,
		private _dialog: MatDialog,
		private _productService: ProductService
	) { }

	ngOnInit(): void {
		this.forms = [];
		this._productService.fetchData()
			.pipe(takeUntil(this._onDestroy))
			.subscribe((res) => {
				res.forEach(() => this.forms.push(new UntypedFormGroup({
					amount: new UntypedFormControl(undefined, Validators.min(1))
				})));
				this.products = res;
			});
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	openDialog = (): void => void this._dialog.open(CartComponent, { width: '600px' });

	addToCart(product: ProductFormModel, formIndex: number): void {
		const amount = +this.getForm(formIndex).get('amount').value;
		let cart: CartProductModel[] = JSON.parse(localStorage.getItem('cart_products')) ?? [];
		let item = cart.find(v => v.id === product.id);

		if (isNullOrUndefined(item) && this._hasEnoughStock(product.stockAmount, amount)) {
			cart.push(CartProductModel.fromProduct(product, amount));
			localStorage.setItem('cart_products', JSON.stringify(cart));
			this._alert.baseAlert('Produto adicionado ao carrinho!');
			return this.getForm(formIndex).reset();
		}

		const newAmount = item.amount + amount;
		if (this._hasEnoughStock(product.stockAmount, newAmount, item.amount)) {
			item.amount = newAmount;
			item.price += amount * (product.salePrice as number);
			localStorage.setItem('cart_products', JSON.stringify(cart));
			this._alert.baseAlert('Produto adicionado ao carrinho!');
			return this.getForm(formIndex).reset();
		}
	}

	private _hasEnoughStock(
		stockAmount: number,
		saleAmount: number,
		cartAmount: number = 0
	): boolean {
		if (saleAmount >= stockAmount) {
			this._alert.baseAlert(
				`N??o h?? quantidade suficiente em estoque!
				Restam ${stockAmount - cartAmount} unidades desse produto.`
			);
			return false;
		}
		return true;
	}

	getForm = (index: number): UntypedFormGroup => this.forms[index];
}
