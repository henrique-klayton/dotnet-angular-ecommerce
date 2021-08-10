import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MaterialModule } from 'src/app/material.module';
import { SaleService } from '../sales/service/sale.service';


@NgModule({
	declarations: [
		DashboardComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		DashboardRoutingModule,
		NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
	],
	providers: [
		SaleService,
	]
})
export class DashboardModule { }
