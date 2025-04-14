import styled from '@emotion/styled';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { EmptyIndicator, Flex } from '..';
import { useMediaQuery, useTheme } from '../../hooks';
import { getChartOptions, getLineChartData } from '../../constants';
import { WorkersOverviewDashboardData } from '../../service/workData';

interface ExpenseLineChartProps {
	data?: WorkersOverviewDashboardData;
}

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExpenseLineChart = ({ data }: ExpenseLineChartProps) => {
	const [theme] = useTheme();
	const isMobile = useMediaQuery('(max-width: 640px)');

	const chartOptions = {
		...getChartOptions({ title: `[${isMobile ? '1000' : ''}원 / ₩]`, style: { padding: 0 }, theme }),
		maintainAspectRatio: false,
	};

	const chartData = getLineChartData({
		theme,
		labels: data?.totalExpensesPerMonth.map(({ month }) => `${month}월`) ?? [],
		data: data?.totalExpensesPerMonth.map(({ price }) => (isMobile ? [...`${price}`].slice(0, 4).join('') : price)) ?? [],
	});

	const isEmptyData = data?.totalExpensesPerMonth.filter(({ price }) => price !== 0).length === 0;

	return (
		<LineChartContainer justifyContent={'center'} width={'100%'}>
			{isEmptyData ? <EmptyIndicator decoration={'⚡️'} label={'데이터가 없습니다'} /> : <Line data={chartData} options={chartOptions} />}
		</LineChartContainer>
	);
};

const LineChartContainer = styled(Flex)`
	position: relative;
	max-width: 100%;
	min-height: 300px;

	@media screen and (min-width: 360px) {
		max-width: calc(100% - 2 * var(--padding-md));
		min-height: 400px;
	}
`;

export default ExpenseLineChart;
