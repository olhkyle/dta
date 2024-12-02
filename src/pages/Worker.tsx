import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BsArrowLeft } from 'react-icons/bs';
import { useAppSelector } from '../store/store';
import { getIsAdmin } from '../store/userSlice';
import { Circle, Flex, HighlightText, Text } from '../components';
import { useGetWorkersDetailQuery, useGoBack, useMediaQuery, useTheme } from '../hooks';
import { formatCurrencyUnit } from '../utils/currencyUnit';
import { getBarChartData, getBarChartOptions } from '../constants/\bchart';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Worker = () => {
	const {
		state: {
			worker: { workerName, workedDate, registrationNumberFront },
		},
	} = useLocation();
	const goBack = useGoBack();

	const [year, month] = [workedDate.getFullYear(), workedDate.getMonth() + 1];
	const [theme] = useTheme();
	const isAdmin = useAppSelector(getIsAdmin);

	const isTabletScreen = useMediaQuery('(min-width: 1024px)');
	const isMobileScreen = useMediaQuery('(max-width: 640px)');

	const { data } = useGetWorkersDetailQuery({
		inOrder: 'asc',
		year,
		month,
		workerName,
	});

	const chartOptions = getBarChartOptions({
		title: `${month}월 [원 / ₩]`,
	});

	const chartData = getBarChartData({
		theme,
		labels: (data?.workers ?? []).map(({ workedDate }) => workedDate.getDate() + '일'),
		barPercentage: isTabletScreen ? 0.6 : 0.4,
		data: (data?.workers ?? []).map(({ payment }) => payment),
	});

	return (
		<Container>
			<GoBackButton type="button" onClick={goBack}>
				<BsArrowLeft size="24" color="var(--text-color)" />
			</GoBackButton>

			<ProfileContainer>
				<div css={{ position: 'absolute', top: '-8px', left: '-4px' }}>
					<Circle size={20} bgColor="var(--color-green-200)" />
				</div>
				<Flex gap="1rem" justifyContent="space-between" margin="0 0 16px">
					<Text typo={isMobileScreen ? 'h5' : 'h4'} color="var(--text-color)">
						{workerName}
					</Text>
					<Text typo={isMobileScreen ? 'h6' : 'h5'} color="var(--disabled-text-color)">
						{isAdmin ? registrationNumberFront : '******'}
					</Text>
				</Flex>
				<Flex gap="1rem" margin="0 0 0.5rem">
					<Text typo={isMobileScreen ? 'p' : 'h6'} color="var(--disabled-text-color)">
						{`${month}월 일한 횟수`}
					</Text>

					<Flex gap="0.3rem">
						<HighlightText color="var(--text-color)" bgColor="var(--bg-color)">
							{data?.workers.length}
						</HighlightText>
						<Text typo={isMobileScreen ? 'p' : 'h6'} color="var(--disabled-text-color)">
							회
						</Text>
					</Flex>
				</Flex>
				<Flex gap="1rem">
					<Text typo={isMobileScreen ? 'p' : 'h6'} color="var(--disabled-text-color)">
						{`${month}월 총 지급 금액`}
					</Text>
					<Flex gap="0.3rem">
						<HighlightText color="var(--text-color)" bgColor="var(--bg-color)">
							{formatCurrencyUnit(data?.sumOfPayment)}
						</HighlightText>
						<Text typo={isMobileScreen ? 'p' : 'h6'} color="var(--disabled-text-color)">
							원
						</Text>
					</Flex>
				</Flex>
			</ProfileContainer>
			<Bar data={chartData} options={chartOptions} />
		</Container>
	);
};

const Container = styled.div`
	margin: 32px auto;
	padding: 0 16px;
	max-width: 1280px;
	width: 100%;
`;

const ProfileContainer = styled.div`
	position: relative;
	margin-left: auto;
	margin-top: 32px;
	margin-bottom: 64px;
	padding: var(--btn-md-padding);
	width: 40dvw;
	border: 1px solid var(--color-gray-300);
	border-radius: var(--radius);
	background-color: var(--option-hover-bg-color);

	@media screen and (max-width: 640px) {
		width: 70dvw;
	}
`;

const GoBackButton = styled.button`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: 0.3rem;
	font-weight: var(--fw-semibold);
	background-color: var(--outline-color);
	outline: 1px solid var(--table-border-color);
	outline-offset: 2px;
	border-radius: var(--radius);
	transition: all 0.3s ease-in-out 0.15s;

	&:hover {
		background-color: var(--option-hover-bg-color);
	}
`;

export default Worker;
