import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { MaterialModule } from 'src/app/material.module';
import { ProductService } from '../product/service/product.service';
import { CartModule } from '../cart/cart.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		SalesComponent
	],
	imports: [
		CommonModule,
		CartModule,
		FormsModule,
		ReactiveFormsModule,
		SalesRoutingModule,
		MaterialModule,
	],
	providers: [
		ProductService
	]
})
export class SalesModule { }
