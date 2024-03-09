import { formatNumber } from '@angular/common';
import {
	ChangeDetectionStrategy, Component, Inject,
	OnDestroy, OnInit
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/service/alert.service';
import { FormValidationService } from 'src/app/shared/service/form.service';
import { PRODUCT_CATEGORIES } from 'src/app/utils/constants';
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
	// TODO Use typed form
	public form!: UntypedFormGroup;
	public categories = PRODUCT_CATEGORIES;
	private _onDestroy = new Subject<void>();

	constructor(
		public formValidation: FormValidationService,
		public dialogRef: MatDialogRef<ProductFormComponent>,
		private fb: UntypedFormBuilder,
		private productService: ProductService,
		private sanitizer: DomSanitizer,
		private alert: AlertService,
		@Inject(MAT_DIALOG_DATA) public data?: number
	) {}

	get image() {
		return this.form.get('image')!;
	}

	ngOnInit(): void {
		this.form = this.fb.group(new ProductFormModel());
		if (this.data) {
			this.productService
				.fetchProductById(this.data)
				.pipe(takeUntil(this._onDestroy), map(p => {
					p.costPrice = formatNumber(p.costPrice as number, 'pt-BR', '1.2-2');
					p.salePrice = formatNumber(p.salePrice as number, 'pt-BR', '1.2-2');
					return p;
				}))
				.subscribe((p) => this.form.patchValue(p));
		}

		this.form.get('imageInput')!.valueChanges
			.pipe(takeUntil(this._onDestroy), filter(v => v != null))
			.subscribe(file => {
				if (!file.type.startsWith('image/')) this.alert.baseAlert('Imagem inválida!');
				this.readImage(file);
			});
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	public async saveProduct() {
		try {
			const obj = new ProductModel({ ...this.form.value });
			await this.productService.insertOrUpdateProduct(obj, this.data);
			this.dialogRef.close();
		} catch (err: any) {
			throw new Error(err);
		}
	}

	private readImage(file: Blob) {
		let fr = new FileReader();
		fr.readAsDataURL(file);
		fr.onload = () => {
			// FIXME Verificar tipo de dado antes de aplicar imagem (data:image)
			this.image.patchValue(this.sanitizer.bypassSecurityTrustUrl(fr.result as string));
			this.alert.baseAlert('Imagem carregada com sucesso!');
		};
		fr.onerror = () => {
			this.alert.baseAlert('Erro ao carregar a imagem!');
		};
	}
}
