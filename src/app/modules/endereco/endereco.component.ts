import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EnderecoFormComponent } from './form/endereco.form.component';
import { AddressFormModel } from './form/model/address.form.model';
import { AddressModel } from './model/address.model';
import { AddressService } from './service/address.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
})
export class EnderecoComponent implements OnInit, AfterViewInit, OnDestroy {
  public displayedColumns: string[] = [
    'cep',
    'logradouro',
    'bairro',
    'localidade',
    'uf',
    'actions',
  ];
  public dataSource: MatTableDataSource<AddressFormModel>;

  private _onDestroy = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _addressService: AddressService,
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

  public getData() {
    this._addressService
      .fetchData()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((res) => (this.dataSource.data = res));
  }

  public openDialog(id?: string): void {
    const dialogRef = this.dialog.open(EnderecoFormComponent, {
      width: '600px',
      data: { id: id, table: this.dataSource.data },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((res) => console.log(res));
  }

  public deleteAddress(cep: string) {
    this._addressService
      .deleteAddress(cep)
      .then(() => this._snackBar.open('Endereço deletado com sucesso!', 'Fechar'))
      .catch(() => this._snackBar.open('Erro ao deletar o endereço!', 'Fechar'));
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
