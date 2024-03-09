import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserFormComponent } from './form/user.form.component';
import { UserModel } from './model/user.model';
import { UserService } from './service/user.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewInit, OnDestroy {
	public displayedColumns: string[] = [
		'name',
		'type',
		'email',
		'phone',
		'birthday',
		'cep',
		// "complement",
		'actions',
	];
	public dataSource: MatTableDataSource<UserModel>;

	private onDestroy = new Subject<void>();

	@ViewChild(MatPaginator) paginator: MatPaginator | null = null;
	@ViewChild(MatSort) sort: MatSort | null = null;

	constructor(
		private userService: UserService,
		public dialog: MatDialog,
	) {
		this.dataSource = new MatTableDataSource();
	}

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

	public openDialog(id?: string): void {
		this.dialog.open(UserFormComponent, {
			width: '600px',
			data: id,
		});
	}

	public getData() {
		return this.userService
			.fetchData()
			.pipe(takeUntil(this.onDestroy))
			.subscribe((res) => (this.dataSource.data = res));
	}

	public deleteUser = (id: string) => this.userService.deleteUser(id);

	public applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	// FIXME Remover dados inválidos no banco
	public formatDate(date: string | { toDate: () => Date }) {
		if (typeof date === 'object') {
			return moment(date.toDate()).format('L');
		}
		return moment(date).format('L');
	}
}
