import { Injectable } from '@angular/core';
import {
	NgForm,
	UntypedFormControl,
	FormGroupDirective,
	FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable({
	providedIn: 'root',
})
export class FormValidationService implements ErrorStateMatcher {
	constructor() {}

	isErrorState(
		control: UntypedFormControl | null,
		form: FormGroupDirective | NgForm | null
	): boolean {
		const isSubmitted = form && form.submitted;
		return !!(
			control &&
			control.invalid &&
			(control.dirty || control.touched || isSubmitted)
		);
	}
}
