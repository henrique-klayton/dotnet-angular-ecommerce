import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { MaterialModule } from 'src/app/material.module';
import { SaleService } from '../sales/service/sale.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './service/dashboard.service';

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
		DashboardService,
		SaleService,
	]
})
export class DashboardModule { }
