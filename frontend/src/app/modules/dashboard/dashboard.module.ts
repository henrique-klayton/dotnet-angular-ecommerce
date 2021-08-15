import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { MaterialModule } from 'src/app/material.module';
import { AddressService } from '../endereco/service/address.service';
import { ProductService } from '../product/service/product.service';
import { SaleService } from '../sales/service/sale.service';
import { CardComponent } from './card/card.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './service/dashboard.service';
import { ChartComponent } from './chart/chart.component';

@NgModule({
	declarations: [
		DashboardComponent,
		CardComponent,
		ChartComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		MaterialModule,
		DashboardRoutingModule,
		NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
	],
	providers: [
		AddressService,
		DashboardService,
		ProductService,
		SaleService,
	]
})
export class DashboardModule { }
