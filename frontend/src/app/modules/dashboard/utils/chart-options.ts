import { formatCurrency } from '@angular/common';
// FIXME error TS7016: Could not find a declaration file for module 'echarts/lib/echarts'.
// '/home/henrique/Code/WebProjects/Ecommerce/frontend/node_modules/echarts/lib/echarts.js'
// implicitly has an 'any' type.
// If the 'echarts' package actually exposes this module, try adding a new declaration (.d.ts)
// file containing `declare module 'echarts/lib/echarts';`
import { EChartsOption } from 'echarts/lib/echarts';
import { MONTHS } from 'src/app/utils/constants';

const labelFormatter = (value: any): string => formatCurrency(value.data as number, 'pt-BR', 'R$');

const tooltipFormatter = ([value]: any): string => {
	const price = labelFormatter(value);
	const baseStyle = 'font-size:14px;color:#666;';
	const titleStyle = `${baseStyle}font-weight:400;line-height:1;`;
	const seriesStyle = `${baseStyle}font-weight:400;margin-left:2px;`;
	const priceStyle = `${baseStyle}font-weight:900;float:right;margin-left:20px;`;

	return `<span style="${titleStyle}">${value.name}</span><br>
					${value.marker}
					<span style="${seriesStyle}">${value.seriesName}</span>
					<span style="${priceStyle}">${price}</span>`;
};

export const SALE_CHART_OPTIONS: EChartsOption = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'line',
		},
		formatter: tooltipFormatter,
	} as any, // FIXME Use correct typing
	grid: {
		top: '15%',
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
				formatter: labelFormatter,
			},
		},
	],
};

export const PRODUCT_CHART_OPTIONS: EChartsOption = {
	tooltip: {
		trigger: 'item',
	},
	grid: {
		top: '20%',
		left: '0%',
		right: '0%',
		bottom: '0%',
		containLabel: true
	},
	legend: {
		type: 'scroll',
		orient: 'vertical',
		right: 20,
		top: 20,
		bottom: 20,
		data: [],
		textStyle: {
			width: 160,
			overflow: 'truncate',
		},
	},
	series: [
		{
			name: 'Produtos',
			type: 'pie',
			data: [],
			label: {
				show: true,
				width: 80,
			},
			center: ['30%', '50%'],
		},
	],
};