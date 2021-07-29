import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from 'src/app/material.module';
import { CartComponent } from './cart.component';
import { CartService } from './service/cart.service';



@NgModule({
	declarations: [
		CartComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		NgxMaskModule
	],
	exports: [
		CartComponent
	],
	providers: [
		CartService,
	]
})
export class CartModule { }
