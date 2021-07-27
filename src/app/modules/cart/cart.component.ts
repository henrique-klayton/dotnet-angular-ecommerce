import { Component, OnInit, ChangeDetectionStrategy, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from '../product/model/product.model';
import { ProductService } from '../product/service/product.service';
import { CartProductModel } from './model/cart-product.model';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
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
		@Inject(MAT_DIALOG_DATA) public data: EventEmitter<CartProductModel>
	) { }

	ngOnInit(): void {
		this.getData();
	}

	getData = () => this.dataSource.data = JSON.parse(localStorage.getItem('cart_products'));
	removeItem(row) {
		let cartProducts: CartProductModel[] = JSON.parse(localStorage.getItem('cart_products'));
		const index = this.dataSource.data.indexOf(row);
		cartProducts.splice(index, 1);
		this.dataSource.data = cartProducts;
		localStorage.setItem('cart_products', JSON.stringify(cartProducts));
	}
	getTotalPrice = () => this.dataSource.data?.reduce((total, product) => total += product.price, 0);
}
