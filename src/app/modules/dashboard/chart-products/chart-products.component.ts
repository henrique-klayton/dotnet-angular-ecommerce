import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ECharts } from 'echarts/lib/echarts';
import { combineLatest, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductFormModel } from '../../product/form/model/product.form.model';
import { PRODUCT_CHART_OPTIONS } from '../utils/chart-options';

type CombinedData = { data: ProductFormModel[], category: string };

@Component({
	selector: 'app-dashboard-chart-products',
	templateUrl: './chart-products.component.html',
	styleUrls: ['./chart-products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartProductsComponent implements OnInit, OnDestroy {
	public chartOptions = PRODUCT_CHART_OPTIONS;
	public isLoading: boolean = false;
	public css: string;
	private _onDestroy = new Subject<void>();
	@Input() maxHeight: string = '250px';
	@Input() categoryEvent: Subject<string>;
	@Input() categorizedProductsEvent: Subject<any>;
	constructor() { }
	ngOnInit(): void {
		this.css = `max-height: ${this.maxHeight};`;
	}
	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}
	getData(chart: ECharts) {
		const observables = [
			this.categorizedProductsEvent,
			this.categoryEvent.pipe(startWith('Alimentos'))
		];
		combineLatest(observables)
			.pipe(
				map(([data, category]) => ({ data, category } as CombinedData))
			)
			.subscribe(({ data, category }) => {
				this.setChartData(chart, data, category);
			});
	}
	setChartData(chart: ECharts, data: ProductFormModel[], category: string) {
		const products = data[category];
		const legend = products.map(({ name }) => name);
		chart.setOption({
			legend: { data: legend },
			series: [{ data: products }],
		});
	}
}
