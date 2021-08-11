import { Component, OnDestroy, OnInit } from '@angular/core';
import { ECharts } from 'echarts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardService } from './service/dashboard.service';
import { SaleChartOptions } from './utils/chart-options';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
	private _onDestroy = new Subject<void>();

	public isLoading: boolean = false;
	public chartOptions = SaleChartOptions;
	public numSales: number = 0;
	public numBranch: number = 0;
	public totalStock: number = 0;

	constructor(private _service: DashboardService) { }
	ngOnInit(): void {
		this.subscribeAll();
	}
	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}
	getData(chart: ECharts) {
		this.isLoading = true;
		this._service.fetchSales()
			.pipe(takeUntil(this._onDestroy))
			.subscribe(data => {
				chart.setOption({
					series: [{ data }]
				});
				this.isLoading = false;
			});
	}

	private subscribeAll() {
		this._service.numSales()
			.pipe(takeUntil(this._onDestroy))
			.subscribe(res => this.numSales = res);
		this._service.numAddress()
			.pipe(takeUntil(this._onDestroy))
			.subscribe(res => this.numBranch = res);
		this._service.totalProductsStock()
			.pipe(takeUntil(this._onDestroy))
			.subscribe(res => this.totalStock = res);
	}
}
