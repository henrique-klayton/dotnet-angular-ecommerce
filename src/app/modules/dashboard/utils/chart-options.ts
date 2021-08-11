import { EChartsOption } from 'echarts';
import { MONTHS } from 'src/app/utils/constants';

export const SaleChartOptions: EChartsOption = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'line',
		}
	},
	grid: {
		top: '20%',
		left: '0%',
		right: '2%',
		bottom: '0%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		data: MONTHS.map(month => month.name).slice(1),
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			name: 'Vendas',
			type: 'line',
			data: new Array(12).fill(0),
			smooth: true,
			label: {
				show: true,
			},
		},
	],
};