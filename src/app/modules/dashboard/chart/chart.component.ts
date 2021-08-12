import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts/lib/echarts';
import { Observable, Subject } from 'rxjs';
import { delay, repeatWhen, take, takeUntil, takeWhile } from 'rxjs/operators';
import { isNullOrWhitespace } from 'src/app/utils/functions';

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
	@Input() maxHeight?: string;
	@Input() chartData: Observable<T[]>;
	@Input() repeatOn: Observable<void>;
	@Input() dataFormatter: (chart: ECharts, chartData: T[], data?: D) => void;
	@Input() data?: D;

	private _onDestroy = new Subject<void>();
	private currentData: T[];
	constructor() {	}
	ngOnInit(): void {
		this.css = `max-height: ${this.maxHeight ?? '250px'};`;
	}
	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}
	getData(chart: ECharts) {
		this.isLoading = true;
		this.chartData
			.pipe(
				takeWhile(() => true),
				takeUntil(this._onDestroy),
				repeatWhen(() => {
					if (this.repeatOn)
						return this.repeatOn;
				})
			)
			.subscribe(data => {
				this.currentData = data;
				this.dataFormatter(chart, this.currentData, this.data);
				this.isLoading = false;
			});
	}
}
