import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EnderecoFormComponent } from './form/endereco.form.component';
import { AddressModel } from './model/address.model';
import { AddressService } from './service/address.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
})
export class EnderecoComponent implements OnInit {
  public displayedColumns: string[] = [
    'cep',
    'logradouro',
    'bairro',
    'localidade',
    'uf',
  ];
  public dataSource: MatTableDataSource<AddressModel>;

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

  public getData() {
    this._addressService.fetchData().subscribe(res => this.dataSource.data = res);
  }

  public openDialog(id?: string): void {
    const dialogRef = this.dialog.open(EnderecoFormComponent, {
      width: '600px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((res) => console.log(res));
  }


  public deleteAddress(cep: string) {}

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
