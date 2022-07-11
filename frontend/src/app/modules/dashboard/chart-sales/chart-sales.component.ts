import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ECharts } from 'echarts/lib/echarts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardService } from '../service/dashboard.service';
import { SALE_CHART_OPTIONS } from '../utils/chart-options';

@Component({
	selector: 'app-dashboard-chart-sales',
	templateUrl: './chart-sales.component.html',
	styleUrls: ['./chart-sales.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartSalesComponent implements OnInit, OnDestroy {
	public isLoading: boolean = false;
	public css: string;
	public chartOptions = SALE_CHART_OPTIONS;

	private _onDestroy = new Subject<void>();
	@Input() maxHeight: string = '250px';

	constructor(private _service: DashboardService) { }

	ngOnInit(): void {
		this.css = `max-height: ${this.maxHeight};`;
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	getData = (chart: ECharts) => this._service.fetchMonthlySalesValue()
		.pipe(takeUntil(this._onDestroy))
		.subscribe(sales => this._updateChartData(chart, sales));

	private _updateChartData = (chart: ECharts, data: number[]) => chart.setOption({
		series: [{ data }],
	});
}
