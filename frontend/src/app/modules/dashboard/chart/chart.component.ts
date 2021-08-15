import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts/lib/echarts';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-dashboard-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent<T, D> implements OnInit, OnDestroy {
	public isLoading: boolean = false;
	public css: string;
	@Input() title: string;
	@Input() chartOptions: EChartsOption;
	@Input() maxHeight: string = '250px';
	@Input() chartData: Observable<T[]>;
	@Input() repeatOn: Observable<D>;
	@Input() dataFormatter: (chart: ECharts, chartData: T[], data?: D) => void;
	@Input() data?: D;

	private _onDestroy = new Subject<void>();
	private currentData: T[];
	constructor() {	}
	ngOnInit(): void {
		this.css = `max-height: ${this.maxHeight};`;
	}
	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}
	getData(chart: ECharts) {
		this.isLoading = true;
		this.chartData
			.pipe(takeUntil(this._onDestroy))
			.subscribe(data => {
				this.currentData = data;
				this.dataFormatter(chart, this.currentData, this.data);
				this.isLoading = false;
			});
		if(this.repeatOn)
			this.repeatOn
				.pipe(takeUntil(this._onDestroy))
				.subscribe(category => {
					this.isLoading = true;
					this.dataFormatter(chart, this.currentData, category);
					this.isLoading = false;
				});
	}
}