import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { MaterialModule } from 'src/app/material.module';
import { AddressFormComponent } from './form/address.form.component';
import { AddressService } from './service/address.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
	declarations: [
		AddressComponent,
		AddressFormComponent,
	],
	imports: [
		CommonModule,
		AddressRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		HttpClientModule,
		AngularFirestoreModule,
	],
	providers: [
		AddressService
	]
})
export class AddressModule { }
