import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnderecoRoutingModule } from './endereco-routing.module';
import { EnderecoComponent } from './endereco.component';
import { MaterialModule } from 'src/app/material.module';
import { EnderecoFormComponent } from './form/endereco.form.component';
import { AddressService } from './service/address.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
	declarations: [
		EnderecoComponent,
		EnderecoFormComponent,
	],
	imports: [
		CommonModule,
		EnderecoRoutingModule,
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
export class EnderecoModule { }
