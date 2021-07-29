import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { MaterialModule } from 'src/app/material.module';
import { ProductService } from '../product/service/product.service';
import { CartModule } from '../cart/cart.module';


@NgModule({
	declarations: [
		SalesComponent
	],
	imports: [
		CommonModule,
		SalesRoutingModule,
		MaterialModule,
		CartModule
	],
	providers: [
		ProductService
	]
})
export class SalesModule { }
