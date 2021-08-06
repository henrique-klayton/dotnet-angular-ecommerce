import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PRODUCT_CATEGORIES } from 'src/app/utils/constants';
import { isNullOrWhitespace } from 'src/app/utils/functions';
import { ProductFormComponent } from './form/product.form.component';
import { ProductFilterModel } from './model/product-filter.model';
import { ProductModel } from './model/product.model';
import { ProductService } from './service/product.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
	public formFilter: FormGroup;
	public dataSource: MatTableDataSource<ProductModel>;
	public displayedColumns: string[] = [
		'name',
		'category',
		'description',
		'cost_price',
		'sale_price',
		'quantity',
		'active',
		'actions',
	];
	public categories = PRODUCT_CATEGORIES;

	private _onDestroy = new Subject<void>();

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		public dialog: MatDialog,
		private _productService: ProductService,
		private _fb: FormBuilder,
	) {
		this.dataSource = new MatTableDataSource();
	}

	ngOnInit(): void {
		this.getData();
		this.formFilter = this._fb.group(new ProductFilterModel());
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.dataSource.filterPredicate = (d, f) => this.filter(d, f as ProductFilterModel);
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	public getData() {
		this._productService
			.fetchData()
			.pipe(takeUntil(this._onDestroy))
			.subscribe((res) => (this.dataSource.data = res));
	}

	public deleteProduct(id: string) {
		this._productService.deleteProduct(id);
	}

	public findProductCategory(id: number): string {
		return PRODUCT_CATEGORIES.find((v) => v.id === id).name;
	}

	public openDialog(id?: string) {
		this.dialog.open(ProductFormComponent, {
			width: '600px',
			data: id
		});
	}

	public applyFilter() {
		this.dataSource.filter = this.formFilter.value;

		if (this.dataSource.paginator)
			this.dataSource.paginator.firstPage();
	}

	private filter(data: ProductModel, filter: ProductFilterModel): boolean {
		const prodName = data.name.toLowerCase().trim();
		const filterName = filter.name?.toLowerCase().trim();
		if (!isNullOrWhitespace(filterName) && !prodName.includes(filterName))
			return false;
		if (!isNullOrWhitespace(filter.category) && data.category !== filter.category)
			return false;
		if (!isNullOrWhitespace(filter.active) && data.active !== filter.active)
			return false;
		return true;
	}
}
