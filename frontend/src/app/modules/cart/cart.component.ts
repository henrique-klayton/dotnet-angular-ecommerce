import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Inject,
	OnInit
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/service/alert.service';
import { isNullOrUndefined } from 'src/app/utils/functions';
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
		'amount',
		'unit_price',
		'price',
		'actions',
	];
	public dataSource = new MatTableDataSource<CartProductModel>();

	constructor(
		public dialogRef: MatDialogRef<CartComponent>,
		private cartService: CartService,
		private alert: AlertService,
		@Inject(MAT_DIALOG_DATA) public data: EventEmitter<CartProductModel>
	) { }

	ngOnInit(): void {
		this.getData();
	}

	// FIXME Remove non-null assertion
	getData = (): void => this.dataSource.data = JSON.parse(localStorage.getItem('cart_products')!);

	removeItem(product: CartProductModel) {
		let cart = this.getCart();
		cart.splice(cart.indexOf(product), 1);
		this.dataSource.data = cart;
		localStorage.setItem('cart_products', JSON.stringify(cart));
	}
	getTotalPrice = (): number => this.dataSource.data.reduce((total, prod) => total + prod.price, 0);

	cancelSale() {
		localStorage.removeItem('cart_products');
		this.getData();
		this.dialogRef.close(false);
	}

	makeSale() {
		if (!isNullOrUndefined(this.dataSource.data) && this.dataSource.data.length !== 0) {
			this.cartService.executeSale(this.dataSource.data)
				.then(() => {
					this.dialogRef.close(true);
					localStorage.removeItem('cart_products');
					this.getData();
				})
				.catch((err) => {
					this.alert.baseAlert('Erro ao efetuar a venda!', 'Fechar');
					console.error(err);
				});
		}
	}

	// FIXME Remove non-null assertion
	private getCart = (): CartProductModel[] => JSON.parse(localStorage.getItem('cart_products')!);
}
