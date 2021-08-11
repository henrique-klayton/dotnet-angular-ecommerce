import { Component } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import { MONTHS } from 'src/app/utils/constants';
import { DashboardService } from './service/dashboard.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
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

	constructor(private _service: DashboardService) { }

	getData(chart: ECharts) {
		this.isLoading = true;
		this._service.fetchSales()
			.subscribe(data => {
				chart.setOption({
					series: [{ data }]
				});
				this.isLoading = false;
			});
	}
}
