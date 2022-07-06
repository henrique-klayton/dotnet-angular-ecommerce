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
	public form: UntypedFormGroup;
	public states = STATES;
	private _onDestroy = new Subject<void>();

	constructor(
		private _fb: UntypedFormBuilder,
		private _addressService: AddressService,
		public _alert: AlertService,
		public _formValidation: FormValidationService,
		public dialogRef: MatDialogRef<AddressFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data?: { id: string, tableData: AddressFormModel[] }
	) { }

	ngOnInit(): void {
		this.form = this._fb.group(new AddressFormModel());
		this._subscribeCep();
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	public saveAddress(): void {
		const cep = this.cep.value;
		const address = this.data.tableData.find(a => a.cep === cep);
		if (address) {
			this._alert.baseAlert(`CEP ${cep} já cadastrado!`);
			return;
		}
		this._addressService.insertAddress(this.form.value).then(() => this.dialogRef.close());
	}

	private _subscribeCep(): void {
		this.cep.valueChanges
			.pipe(
				debounceTime(1000),
				takeUntil(this._onDestroy)
			).subscribe((v) => this._fetchCep(v));
	}

	private _fetchCep(cep: string) {
		if (!isNullOrWhitespace(cep) && cep.length === 8)
			this._addressService.fetchCep(cep).then((res) => this.form.patchValue(res));
	}

	get cep(): AbstractControl {
		return this.form.get('cep');
	}
}
