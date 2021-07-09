import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFormComponent } from './form/product.form.component';
import { ProductModel } from './model/product.model';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public dataSource: MatTableDataSource<ProductModel>;
  public displayedColumns: string[] = [
    'name',
    'description',
    'price',
    'active',
    'actions',
  ];

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _productService: ProductService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    this._productService
      .fetchData()
      .subscribe((res) => (this.dataSource.data = res));
  }

  public deleteProduct(id: string) {
    this._productService.deleteProduct(id)
      .then(() => this._snackBar.open('Produto deletado com sucesso!', 'Fechar'))
      .catch(() => this._snackBar.open('Erro ao deletar o produto!', 'Fechar'));
  }

  public openDialog(id?: string) {
    this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: id
    })
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
