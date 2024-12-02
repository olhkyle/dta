import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDebounce, useTheme } from '../hooks';
import { Badge, CustomSelect, EmptyIndicator, Flex, HighlightText, LayoutLoading, SearchInput, SegmentedControl } from '../components';
import { useGetWorkersOverviewQuery } from '../hooks/queries';
import { formatCurrencyUnit } from '../utils/currencyUnit';
import { monthOfToday, months, yearOfToday, years } from '../constants/day';
import { SortOption, controls } from '../constants/sortControls';
import { BsBoxSeam } from 'react-icons/bs';
import { sortWorkerData } from '../service/utils';
import { getBarChartData, getBarChartOptions } from '../constants/\bchart';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverView = () => {
	const [inputValue, setInputValue] = useState('');
	const workerName = useDebounce(inputValue, 500);

	const [year, setYear] = useState(yearOfToday);
	const [month, setMonth] = useState(monthOfToday);
	const [currentSort, setCurrentSort] = useState<SortOption>('asc');
	const [currentDisplayType, setCurrentDisplayType] = useState<'목록' | '차트'>('목록');

	const [theme] = useTheme();

	const data = useGetWorkersOverviewQuery({ year, month, workerName });

	const chartOptions = getBarChartOptions({ title: `${month}월 일용직 [원/₩]` });

	const chartData = getBarChartData({
		theme,
		labels: sortWorkerData(data?.workers ?? [], currentSort).map(({ workerName }) => workerName),
		barPercentage: 0.75,
		data: sortWorkerData(data?.workers ?? [], currentSort).map(({ sumOfPayment }) => sumOfPayment),
	});

	return (
		<Container>
			<SearchInput value={inputValue} setValue={setInputValue} />
			<CustomFlex margin="32px 0" gap="16px">
				<SegmentedControl data={['목록', '차트']} value={currentDisplayType} setValue={setCurrentDisplayType} />
				<SearchFilters direction="column" justifyContent="space-between" gap="16px" width="100%">
					<Flex gap="16px" alignItems="center" margin="0 auto 0 0">
						<SegmentedControl data={controls} value={currentSort} setValue={setCurrentSort} />
						<CustomSelect data={years} value={year} setValue={setYear} unit="년" />
						<CustomSelect data={months} value={month} setValue={setMonth} unit="월" />
					</Flex>
					<Flex justifyContent="flex-end" margin="16px 0 0 auto">
						<Badge label="총 합계" bgColor="var(--text-color)">
							{formatCurrencyUnit(data?.sumOfPayment)}
						</Badge>
					</Flex>
				</SearchFilters>
			</CustomFlex>

			<Suspense fallback={<LayoutLoading />}>
				{data?.workers.length === 0 ? (
					<EmptyIndicator>
						<BsBoxSeam size={60} color="var(--color-gray-500)" />
						<p>해당 월에는 작업한 일용직이 없습니다</p>
					</EmptyIndicator>
				) : currentDisplayType === '목록' ? (
					<Table>
						<thead>
							<tr>
								<th aria-label="tableHead-index">#</th>
								<th aria-label="tableHead-workerName">성 명</th>
								<th aria-label="tableHead-monthOfWorkedDate">해당 월</th>
								<th aria-label="tableHead-sumOfPayment">
									금 액<span>(원)</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{sortWorkerData(data?.workers ?? [], currentSort).map(({ workerName, workedDate, sumOfPayment }, idx) => (
								<tr key={workerName}>
									<td aria-label="tableBody-index">
										<span>{idx + 1}</span>
									</td>
									<td aria-label="tableBody-workerName">{workerName}</td>
									<td aria-label="tableBody-monthOfWorkedDate">{workedDate.getMonth() + 1}월</td>
									<td aria-label="tableBody-sumOfPayment">{formatCurrencyUnit(sumOfPayment)}</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<Flex direction="column" margin="48px 0">
						<Bar data={chartData} options={chartOptions} />
						<ResponsiveFlex justifyContent="flex-end" margin="32px 0">
							<HighlightText color="var(--bg-color)" bgColor="var(--text-color)" fontSize="var(--fz-sm)">
								💡 현재 화면 사이즈에서는 차트의 정확한 데이터를 파악하기 어렵습니다
							</HighlightText>
						</ResponsiveFlex>
					</Flex>
				)}
			</Suspense>
		</Container>
	);
};

const Container = styled.div`
	padding: 0 16px;
	max-width: 1280px;
	width: 100%;
`;

const CustomFlex = styled(Flex)`
	@media screen and (max-width: 1024px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const SearchFilters = styled(Flex)`
	@media screen and (min-width: 640px) {
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}
`;

const Table = styled.table`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	margin: 32px auto 96px;
	width: 100%;
	text-align: center;
	border: 1px solid var(--color-gray-300);
	border-radius: var(--radius);

	thead > tr,
	tbody > tr {
		display: grid;
		grid-template-columns: 1fr 2fr 1.5fr 3fr;
	}

	tr {
		padding: 16px 0;
	}

	thead > tr {
		border-bottom: 1px solid var(--color-gray-300);
	}

	tbody > tr {
		border-bottom: 1px solid var(--outline-color);
	}

	th {
		font-size: var(--fz-rp);

		span {
			font-size: var(--fz-rp);
		}

		@media screen and (min-width: 720px) {
			font-size: var(--fz-h7);
		}
	}

	td {
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: var(--fz-rp);
	}

	td[aria-label='tableBody-index'] > span {
		display: inline-block;
		width: 24px;
		color: var(--color-gray-800);
		background-color: var(--color-gray-100);
		border: 1px solid var(--color-gray-opacity-200);
		border-radius: calc(var(--radius) * 0.5);
	}

	@media screen and (max-width: 640px) {
		border-color: var(--color-white);
	}
`;

const ResponsiveFlex = styled(Flex)`
	display: none;

	@media screen and (min-width: 640px) {
		font-size: var(--fz-rp);
	}

	@media screen and (max-width: 768px) {
		display: flex;
	}
`;

export default OverView;
