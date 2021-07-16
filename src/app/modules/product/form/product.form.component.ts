import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormValidationService } from 'src/app/shared/service/form.service';
import { PRODUCT_CATEGORIES } from 'src/app/util/constants';
import { ProductModel } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { ProductFormModel } from './model/product.form.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product.form.component.html',
  styleUrls: ['./product.form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public categories = PRODUCT_CATEGORIES;
  private _onDestroy = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _snackBar: MatSnackBar,
    public _formValidation: FormValidationService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: string
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group(new ProductModel());
    if (this.data) {
      this._productService
        .fetchProductById(this.data)
        .pipe(takeUntil(this._onDestroy))
        .subscribe((p) => this.form.patchValue(p));
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  public saveProduct() {
    const obj = this.form.value;
    this._productService
      .insertOrUpdateProduct(obj, this.data)
      .then(() => {
        this.dialogRef.close();
        this._snackBar.open('Produto cadastrado com sucesso!', 'Fechar');
      })
      .catch(() => this._snackBar.open('Erro ao cadastrar o produto!', 'Fechar'));

    // TODO
    // this._snackBar.open('Produto cadastrado com sucesso!', 'Fechar');
    // this._snackBar.open('Erro ao cadastrar o produto!', 'Fechar');
  }

  private readImage(fileArr) {
    return new Promise((resolve: (result: string | ArrayBuffer) => void, reject) => {
      let fr = new FileReader();
      fr.readAsDataURL(fileArr.files[0]);
      fr.onloadend = () => {
        console.log(fr.result);
        resolve(fr.result);
      };
      fr.onerror = () => {
        reject(new Error('Unable to read..'));
      };
    });
  }
}
