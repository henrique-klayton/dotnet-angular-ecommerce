import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PRODUCT_CATEGORIES, STATUS } from 'src/app/utils/constants';
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
	public formFilter!: UntypedFormGroup;
	public dataSource: MatTableDataSource<ProductModel>;
	public displayedColumns: string[] = [
		'name',
		'category',
		'description',
		'costPrice',
		'salePrice',
		'stockAmount',
		'status',
		'actions',
	];
	public categories = PRODUCT_CATEGORIES;
	public status = STATUS;

	private _onDestroy = new Subject<void>();

	@ViewChild(MatPaginator) paginator: MatPaginator | null = null;
	@ViewChild(MatSort) sort: MatSort | null = null;

	constructor(
		public dialog: MatDialog,
		private productService: ProductService,
		private fb: UntypedFormBuilder,
	) {
		this.dataSource = new MatTableDataSource();
	}

	ngOnInit(): void {
		this.formFilter = this.fb.group(new ProductFilterModel());
		this.getData();
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.dataSource.filterPredicate = (d, f) => this.filter(d, f as ProductFilterModel);
		this.applyFilter();
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	public getData() {
		this.productService
			.fetchData()
			.pipe(takeUntil(this._onDestroy))
			.subscribe((res) => (this.dataSource.data = res));
	}

	public deleteProduct(id: number) {
		this.productService.deleteProduct(id);
	}

	public findProductCategory(id: number): string | undefined {
		return PRODUCT_CATEGORIES.find((v) => v.id === id)?.name;
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
		const prodDesc = data.description?.toLowerCase().trim() ?? '';
		const filterText = filter.text?.toLowerCase().trim();
		if (!isNullOrWhitespace(filterText) && !prodName.includes(filterText)
			&& !prodDesc.includes(filterText))
			return false;
		if (!isNullOrWhitespace(filter.category?.toString()) && data.category !== filter.category)
			return false;
		if (!isNullOrWhitespace(filter.status?.toString()) && data.status !== filter.status)
			return false;
		return true;
	}
}
