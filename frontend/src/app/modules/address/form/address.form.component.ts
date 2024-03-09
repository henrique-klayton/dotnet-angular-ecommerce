import {
	ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit
} from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/service/alert.service';
import { FormValidationService } from 'src/app/shared/service/form.service';
import { STATES } from 'src/app/utils/constants';
import { isNullOrWhitespace } from 'src/app/utils/functions';
import { AddressService } from '../service/address.service';
import { AddressFormModel } from './model/address.form.model';

@Component({
	selector: 'app-address.form',
	templateUrl: './address.form.component.html',
	styleUrls: ['./address.form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements OnInit, OnDestroy {
	// TODO Use typed form
	public form!: UntypedFormGroup;
	public states = STATES;
	private onDestroy = new Subject<void>();

	constructor(
		private fb: UntypedFormBuilder,
		private addressService: AddressService,
		public alert: AlertService,
		public formValidation: FormValidationService,
		public dialogRef: MatDialogRef<AddressFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data?: { id: string, tableData: AddressFormModel[] }
	) { }

	get cep(): AbstractControl {
		return this.form.get('cep')!;
	}

	ngOnInit(): void {
		this.form = this.fb.group(new AddressFormModel());
		this.subscribeCep();
	}

	ngOnDestroy(): void {
		this.onDestroy.next();
		this.onDestroy.complete();
	}

	public saveAddress(): void {
		const cep = this.cep.value;
		const address = this.data?.tableData.find(a => a.cep === cep);
		if (address) {
			this.alert.baseAlert(`CEP ${cep} já cadastrado!`);
			return;
		}
		this.addressService.insertAddress(this.form.value).then(() => this.dialogRef.close());
	}

	private subscribeCep(): void {
		this.cep.valueChanges
			.pipe(
				debounceTime(1000),
				takeUntil(this.onDestroy)
			).subscribe((v) => this.fetchCep(v));
	}

	private fetchCep(cep: string) {
		if (!isNullOrWhitespace(cep) && cep.length === 8)
			this.addressService.fetchCep(cep).then((res) => this.form.patchValue(res));
	}
}
