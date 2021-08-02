import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CartProductModel } from './model/cart-product.model';
import { CartService } from './service/cart.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
	public displayedColumns = [
		'name',
		'quantity',
		'unit_price',
		'price',
		'actions',
	];
	public dataSource = new MatTableDataSource<CartProductModel>();

	constructor(
		public dialogRef: MatDialogRef<CartComponent>,
		private _cartService: CartService,
		private _snackBar: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) public data: EventEmitter<CartProductModel>
	) { }

	ngOnInit(): void {
		this.getData();
	}

	getData = () =>
		this.dataSource.data = JSON.parse(localStorage.getItem('cart_products'));

	removeItem(product: CartProductModel) {
		let cart = this.getCart();
		const index = cart.indexOf(product);
		cart.splice(index, 1);
		this.dataSource.data = cart;
		localStorage.setItem('cart_products', JSON.stringify(cart));
	}
	getTotalPrice = () =>
		this.dataSource.data?.reduce((total, product) => total += product.price, 0);

	cancelSale() {
		localStorage.removeItem('cart_products');
		this.getData();
		this.dialogRef.close(false);
	}

	makeSale() {
		this._cartService.executeSale(this.dataSource.data)
			.then(() => this.dialogRef.close(true))
			.catch((err) => {
				this._snackBar.open('Erro ao efetuar a venda!', 'Fechar');
				this.getData();
				// eslint-disable-next-line no-console
				console.error(err);
			});
	}

	private getCart = (): CartProductModel[] =>
		JSON.parse(localStorage.getItem('cart_products'));
}
