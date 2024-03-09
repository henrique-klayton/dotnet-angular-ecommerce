import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddressFormComponent } from './form/address.form.component';
import { AddressFormModel } from './form/model/address.form.model';
import { AddressService } from './service/address.service';

@Component({
	selector: 'app-address',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit, AfterViewInit, OnDestroy {
	public displayedColumns: string[] = [
		'cep',
		'logradouro',
		'bairro',
		'localidade',
		'uf',
		'actions',
	];
	public dataSource = new MatTableDataSource<AddressFormModel>();

	private onDestroy = new Subject<void>();

	@ViewChild(MatPaginator) paginator: MatPaginator | null = null;
	@ViewChild(MatSort) sort: MatSort | null = null;

	constructor(
		private addressService: AddressService,
		public dialog: MatDialog,
	) {}

	ngOnInit(): void {
		this.getData();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	ngOnDestroy(): void {
		this.onDestroy.next();
		this.onDestroy.complete();
	}

	openDialog(id?: string): void {
		this.dialog.open(AddressFormComponent, {
			width: '600px',
			data: { id: id, tableData: this.dataSource.data },
		});
	}

	deleteAddress = (cep: string) => this.addressService.deleteAddress(cep);

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator)
			this.dataSource.paginator.firstPage();
	}

	private getData() {
		this.addressService
			.fetchData()
			.pipe(takeUntil(this.onDestroy))
			.subscribe((res) => (this.dataSource.data = res));
	}
}
