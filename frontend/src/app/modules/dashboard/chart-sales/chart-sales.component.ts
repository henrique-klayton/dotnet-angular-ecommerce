import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ECharts } from 'echarts';
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
	public css: string = '';
	public chartOptions = SALE_CHART_OPTIONS;

	private onDestroy = new Subject<void>();
	@Input() maxHeight: string = '250px';

	constructor(private service: DashboardService) { }

	ngOnInit(): void {
		this.css = `max-height: ${this.maxHeight};`;
	}

	ngOnDestroy(): void {
		this.onDestroy.next();
		this.onDestroy.complete();
	}

	getData = (chart: ECharts) => this.service.fetchMonthlySalesValue()
		.pipe(takeUntil(this.onDestroy))
		.subscribe(sales => this.updateChartData(chart, sales));

	private updateChartData = (chart: ECharts, data: number[]) => chart.setOption({
		series: [{ data }],
	});
}
