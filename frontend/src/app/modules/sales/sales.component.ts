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
	// TODO Use typed form
	public forms!: UntypedFormGroup[];
	public products: ProductFormModel[] = [];
	private onDestroy = new Subject<void>();

	constructor(
		private alert: AlertService,
		private dialog: MatDialog,
		private productService: ProductService
	) { }

	ngOnInit(): void {
		this.forms = [];
		this.productService.fetchData()
			.pipe(takeUntil(this.onDestroy))
			.subscribe((res) => {
				res.forEach(() => this.forms.push(new UntypedFormGroup({
					amount: new UntypedFormControl(undefined, Validators.min(1))
				})));
				this.products = res;
			});
	}

	ngOnDestroy(): void {
		this.onDestroy.next();
		this.onDestroy.complete();
	}

	openDialog = (): void => void this.dialog.open(CartComponent, { width: '600px' });

	addToCart(product: ProductFormModel, formIndex: number): void {
		// FIXME Remove non-null assertions
		const amount = +this.getForm(formIndex).get('amount')!.value;
		let cart: CartProductModel[] = JSON.parse(localStorage.getItem('cart_products')!) ?? [];
		let item = cart.find(v => v.id === product.id)!;

		if (isNullOrUndefined(item) && this.hasEnoughStock(product.stockAmount, amount)) {
			cart.push(CartProductModel.fromProduct(product, amount));
			localStorage.setItem('cart_products', JSON.stringify(cart));
			this.alert.baseAlert('Produto adicionado ao carrinho!');
			return this.getForm(formIndex).reset();
		}

		const newAmount = item.amount + amount;
		if (this.hasEnoughStock(product.stockAmount, newAmount, item.amount)) {
			item.amount = newAmount;
			item.price += amount * (product.salePrice as number);
			localStorage.setItem('cart_products', JSON.stringify(cart));
			this.alert.baseAlert('Produto adicionado ao carrinho!');
			return this.getForm(formIndex).reset();
		}
	}

	private hasEnoughStock(
		stockAmount: number,
		saleAmount: number,
		cartAmount: number = 0
	): boolean {
		if (saleAmount >= stockAmount) {
			this.alert.baseAlert(
				`Não há quantidade suficiente em estoque!
				Restam ${stockAmount - cartAmount} unidades desse produto.`
			);
			return false;
		}
		return true;
	}

	getForm = (index: number): UntypedFormGroup => this.forms[index];
}
