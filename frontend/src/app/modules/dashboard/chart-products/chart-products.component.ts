import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
// FIXME error TS7016: Could not find a declaration file for module 'echarts/lib/echarts'.
// '/home/henrique/Code/WebProjects/Ecommerce/frontend/node_modules/echarts/lib/echarts.js'
// implicitly has an 'any' type.
// If the 'echarts' package actually exposes this module, try adding a new declaration (.d.ts)
// file containing `declare module 'echarts/lib/echarts';`
import { ECharts } from 'echarts/lib/echarts';
import { combineLatest, Observable } from 'rxjs';
import { PRODUCT_CHART_OPTIONS } from '../utils/chart-options';
import { CategorizedProducts } from '../utils/interfaces';

type CombinedData = [CategorizedProducts, string];

@Component({
	selector: 'app-dashboard-chart-products',
	templateUrl: './chart-products.component.html',
	styleUrls: ['./chart-products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartProductsComponent implements OnInit {
	// FIXME Remove non-null assertions
	public chartOptions = PRODUCT_CHART_OPTIONS;
	public isLoading: boolean = false;
	public css: string = '';
	@Input() maxHeight: string = '250px';
	@Input() categoryEvent!: Observable<string>;
	@Input() productsEvent!: Observable<CategorizedProducts>;
	constructor() { }
	ngOnInit(): void {
		this.css = `max-height: ${this.maxHeight};`;
	}
	getData(chart: ECharts) {
		combineLatest([
			this.productsEvent,
			this.categoryEvent
		]).subscribe(([data, category]: CombinedData) => {
			this.updateChartData(chart, data, category);
		});
	}
	private updateChartData(chart: ECharts, data: CategorizedProducts, category: string) {
		const products = data[category];
		const productsName = products.map(({ name }) => name);
		chart.setOption({
			legend: { data: productsName },
			series: [{ data: products }],
		});
	}
}
