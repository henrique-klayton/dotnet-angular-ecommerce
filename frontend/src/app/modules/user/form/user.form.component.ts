import {
	ChangeDetectionStrategy, Component, Inject,
	OnDestroy, OnInit
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormValidationService } from 'src/app/shared/service/form.service';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
	selector: 'app-user-form',
	templateUrl: './user.form.component.html',
	styleUrls: ['./user.form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnDestroy {
	// TODO Use typed form
	public form!: UntypedFormGroup;
	public hide: boolean = true;

	private _onDestroy = new Subject<void>();

	constructor(
		private userService: UserService,
		private fb: UntypedFormBuilder,
		public formValidation: FormValidationService,
		public dialogRef: MatDialogRef<UserFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data?: string
	) {}

	ngOnInit(): void {
		this.form = this.fb.group(new UserModel());
		if (this.data) {
			this.userService
				.fetchUserById(this.data)
				.pipe(takeUntil(this._onDestroy))
				.subscribe((u) => this.form.patchValue(u));
		}
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	public saveUser() {
		const obj: UserModel = this.form.value;
		if (!this.data) {
			return this.userService.insertUser(obj)
				.then(() => this.dialogRef.close());
		}
		return this.userService.updateUser(this.data, obj)
			.then(() => this.dialogRef.close());
	}
}
