import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { MONTHS } from 'src/app/utils/constants';
import { SaleModel } from '../cart/model/sale.model';
import { SaleService } from '../sales/service/sale.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
	private data: SaleModel[] = [];
	public isLoading: boolean = false;
	public chartOption: EChartsOption = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'line',
				label: {
					// backgroundColor: '#6a7985'
				}
			}
		},
		xAxis: {
			type: 'category',
			data: MONTHS.map(({name: month}) => month).slice(1),
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				name: 'Vendas',
				type: 'line',
				data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				smooth: true,
				label: {
					show: true,
				}
			},
		],
	};

	constructor(private _saleService: SaleService) { }

	getData(chart: ECharts) {
		this.isLoading = true;
		this._saleService.fetchSales()
			.subscribe(res => {
				let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				res.forEach(sale => {
					const index = moment(sale.created.seconds * 1000).month();
					data[index] = data[index] + 1;
				});
				chart.setOption({
					series: [{ data }]
				});
				this.isLoading = false;
			});
	}
}
