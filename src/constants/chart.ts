import { Theme } from '../store/themeSlice';

interface GetBarChartOptions {
	title: string;
}

interface GetBarChartData {
	theme: Theme;
	labels: string[];
	barPercentage: number;
	data: (number | string | undefined)[];
}

const getBarChartOptions = ({ title }: GetBarChartOptions) => {
	return {
		responsive: true,
		spanGaps: true,
		plugins: {
			legend: {
				display: false,
				labels: {
					font: {
						family: "'Pretendard', 'serif'",
						lineHeight: 1,
					},
				},
			},
			title: {
				display: true,
				text: title,
			},
		},
	};
};

const getBarChartData = ({ theme, labels, barPercentage, data }: GetBarChartData) => {
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
				datalabels: {
					anchor: 'start' as const,
					align: 'end' as const,
					font: {
						weight: 'bold' as const,
						size: 20,
					},
				},
			},
		],
	};
};

export { getBarChartOptions, getBarChartData };
