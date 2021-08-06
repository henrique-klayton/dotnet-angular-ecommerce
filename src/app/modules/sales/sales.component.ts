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
	public quantity: number;
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
			this.checkProductStock(product.id, quantity).then(() => {
				cart.push(CartProductModel.fromProduct(product, quantity));
				localStorage.setItem('cart_products', JSON.stringify(cart));
				this._alert.baseAlert('Produto adicionado ao carrinho!');
			});
		} else {
			const newQuantity = cart[index].quantity + quantity;
			this.checkProductStock(cart[index].id, newQuantity, cart[index].quantity)
				.then(() => {
					cart[index].quantity = newQuantity;
					cart[index].price += quantity * product.sale_price;
					localStorage.setItem('cart_products', JSON.stringify(cart));
					this._alert.baseAlert('Produto adicionado ao carrinho!');
				});
		}
	}

	private async checkProductStock(
		id: string,
		quantity: number,
		oldQuantity?: number
	): Promise<void> {
		try {
			oldQuantity ??= quantity;
			const stockAmount = (await this._productService.fetchProductById(id).toPromise())
				.quantity;
			if (quantity >= stockAmount) {
				this._alert.baseAlert(
					`Não há quantidade suficiente em estoque!
					Restam ${stockAmount - oldQuantity} unidades desse produto.`
				);
				return Promise.reject();
			}
		} catch (err) {
			this._alert.baseAlert('Erro ao adicionar produto ao carrinho!');
			throw new Error(err);
		}
	}
}
