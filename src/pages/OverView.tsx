import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDebounce, useMediaQuery, useTheme } from '../hooks';
import { Badge, CustomSelect, EmptyIndicator, Flex, HighlightText, Loading, SearchInput, SegmentedControl } from '../components';
import { useGetWorkersOverviewQuery } from '../hooks/queries';
import { formatCurrencyUnit } from '../utils/currencyUnit';
import { monthOfToday, months, yearOfToday, years } from '../constants/day';
import { SortOption, controls } from '../constants/sortControls';
import { BsBoxSeam } from 'react-icons/bs';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverView = () => {
	const [inputValue, setInputValue] = useState('');
	const workerName = useDebounce(inputValue, 500);

	const [year, setYear] = useState(yearOfToday);
	const [month, setMonth] = useState(monthOfToday);
	const [currentSort, setCurrentSort] = useState<SortOption>('asc');
	const [currentDisplayType, setCurrentDisplayType] = useState<'목록' | '차트'>('목록');

	const [theme] = useTheme();
	const isTabletScreenSize = useMediaQuery('(max-width: 768px');
	const isMobileScreenSize = useMediaQuery('(max-width: 480px');

	const data = useGetWorkersOverviewQuery({ inOrder: currentSort, year, month, workerName });

	const chartOptions = {
		responsive: true,
		spanGaps: true,
		plugins: {
			legend: {
				display: false,
				labels: {
					font: {
						family: "'Noto Sans KR', 'serif'",
						lineHeight: 1,
					},
				},
			},
			title: {
				display: true,
				text: `${month}월 일용직 [원 / ₩]`,
			},
		},
	};

	const chartData = {
		labels: data?.workers.map(worker => worker.workerName),
		datasets: [
			{
				type: 'bar' as const,
				label: `-`,
				barPercentage: 0.75,
				data: data?.workers.map(worker => worker.sumOfPayment),
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

	return (
		<>
			<SearchInput value={inputValue} setValue={setInputValue} />
			<CustomFlex margin="32px 0" gap="1rem" height="100%">
				<SegmentedControl data={['목록', '차트']} value={currentDisplayType} setValue={setCurrentDisplayType} />
				<SearchFilters gap="16px" width="100%">
					<Flex gap="1rem" alignItems="center">
						<SegmentedControl data={controls} value={currentSort} setValue={setCurrentSort} />
						<CustomSelect data={years} value={year} setValue={setYear} unit="년" width={120} />
						<CustomSelect data={months} value={month} setValue={setMonth} unit="월" width={120} />
					</Flex>
					<Flex justifyContent="flex-end" margin="16px 0 0 auto">
						<Badge label="총 합계" bgColor="var(--text-color)">
							{formatCurrencyUnit(data?.sumOfPayment)}
						</Badge>
					</Flex>
				</SearchFilters>
			</CustomFlex>

			<Suspense fallback={<Loading />}>
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
							{data?.workers.map(({ workerName, workedDate, sumOfPayment }, idx) => (
								<tr key={workerName}>
									<td aria-label="tableBody-index">{idx + 1}</td>
									<td aria-label="tableBody-workerName">{workerName}</td>
									<td aria-label="tableBody-monthOfWorkedDate">{workedDate.getMonth() + 1}월</td>
									<td aria-label="tableBody-sumOfPayment">{formatCurrencyUnit(sumOfPayment)}</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<Flex margin="3rem 0 0" direction="column">
						<Bar data={chartData} options={chartOptions} />
						<Flex justifyContent="flex-end" margin="2rem 0">
							{isTabletScreenSize && (
								<HighlightText color="var(--bg-color)" bgColor="var(--text-color)" fontSize={isMobileScreenSize ? '13px' : '16px'}>
									💡 현재 화면 사이즈에서는 차트의 정확한 데이터를 파악하기 어렵습니다
								</HighlightText>
							)}
						</Flex>
					</Flex>
				)}
			</Suspense>
		</>
	);
};

const CustomFlex = styled(Flex)`
	@media screen and (max-width: 1024px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const SearchFilters = styled(Flex)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 1rem;

	@media screen and (min-width: 640px) {
		flex-direction: row;
		justify-content: space-between;
	}
`;

const Table = styled.table`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	margin: 2rem auto 6rem;
	width: 100%;
	text-align: center;

	thead > tr,
	tbody > tr {
		display: grid;
		grid-template-columns: 1fr 2fr 1.5fr 3fr;
	}

	tr {
		padding: 1rem 0;
	}

	thead > tr {
		border-bottom: 1px solid var(--color-gray-500);
	}

	tbody > tr {
		border-bottom: 1px solid var(--outline-color);
	}

	th {
		font-size: 16px;

		span {
			font-size: 16px;
		}

		@media screen and (min-width: 720px) {
			font-size: 18px;
		}
	}

	td {
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}
`;

export default OverView;
