import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
export class UserComponent implements OnInit {
  public displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    // "complement",
    'cep',
    // "birthday",
    'actions',
  ];
  public dataSource: MatTableDataSource<UserModel>;

  private _onDestroy = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _userService: UserService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  public openDialog(id?: string): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: id,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((result) => {
        console.log(result);
      });
  }

  public getData() {
    return this._userService
      .fetchData()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((res) => (this.dataSource.data = res));
  }

  public deleteUser(id: string) {
    this._userService
      .deleteUser(id)
      .then(() => this._snackBar.open('Usuário deletado com sucesso!', 'Fechar'))
      .catch(() => this._snackBar.open('Erro ao deletar o usuário!', 'Fechar'));
  }

  public applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
