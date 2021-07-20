import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { MaterialModule } from 'src/app/material.module';
import { ProductService } from '../product/service/product.service';


@NgModule({
	declarations: [
		SalesComponent
	],
	imports: [
		CommonModule,
		SalesRoutingModule,
		MaterialModule
	],
	providers: [
		ProductService
	]
})
export class SalesModule { }
