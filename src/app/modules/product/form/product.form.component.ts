import {
	ChangeDetectionStrategy, Component, Inject,
	OnDestroy, OnInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
		public _formValidation: FormValidationService,
		public dialogRef: MatDialogRef<ProductFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data?: string
	) {}

	ngOnInit(): void {
		this.form = this._fb.group(new ProductFormModel());
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

	public async saveProduct() {
		try {
			let image = this.form.get('image').value;
			if (image?.files)
				image = await this.readImage(this.form.get('image').value.files[0]);
			const obj = new ProductModel({ ...this.form.value, image });
			await this._productService.insertOrUpdateProduct(obj, this.data);
			this.dialogRef.close();
		} catch (err) {
			throw new Error(err);
		}
	}

	private readImage(file: Blob) {
		return new Promise((resolve: (result: string | ArrayBuffer) => void, reject) => {
			let fr = new FileReader();
			fr.readAsDataURL(file);
			fr.onload = () => resolve(fr.result);
			fr.onerror = () => reject(new Error('Unable to read..'));
		});
	}
}
