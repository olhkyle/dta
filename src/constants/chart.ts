import { Theme } from '../store/themeSlice';

interface GetChartOptions {
	title: string;
	style?: {
		padding?: number;
		fontSize?: number;
	};
	theme: Theme;
}

interface GetChartData {
	theme: Theme;
	labels: string[];
	data: (number | string | undefined)[];
	barPercentage?: number;
}

const dataLabels = {
	anchor: 'start' as const,
	align: 'end' as const,
	font: {
		weight: 'bold' as const,
		size: 24,
	},
} as const;

const getGridColor = (theme: Theme) => (theme === 'dark' ? 'rgba(255,255,255, 0.2)' : 'rgba(0,0,0,0.1)');

const getChartOptions = ({ title, style: { padding = 0, fontSize = 14 } = {}, theme }: GetChartOptions) => {
	return {
		responsive: true,
		spanGaps: true,
		layout: {
			padding,
		},
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: title,
				font: {
					size: fontSize,
				},
			},
		},
		scales: {
			x: {
				grid: {
					color: getGridColor(theme),
				},
			},
			y: {
				grid: {
					color: getGridColor(theme),
				},
			},
		},
	};
};

const getBarChartData = ({ theme, labels, barPercentage, data }: GetChartData) => {
	return {
		labels: labels,
		datasets: [
			{
				type: 'bar' as const,
				label: '',
				barPercentage,
				data,
				backgroundColor: theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)',
				borderColor: theme === 'dark' ? 'rgba(240, 240, 240, 0.4)' : 'rgba(240, 240, 240, 0.196)',
				borderWidth: 1,
				borderRadius: 3,
				datalabels: dataLabels,
			},
		],
	};
};

const getLineChartData = ({ theme, labels, data }: GetChartData) => {
	return {
		labels: labels,
		datasets: [
			{
				type: 'line' as const,
				label: '총 비용',
				data,
				borderWidth: 1,
				borderColor: theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(0,0,0)',
				tension: 0.2,
				datalabels: dataLabels,
			},
		],
	};
};

export { getChartOptions, getBarChartData, getLineChartData };
