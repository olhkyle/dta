import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { BsArrowLeft } from 'react-icons/bs';
import { useAppSelector } from '../store/store';
import { getIsAdmin } from '../store/userSlice';
import { Circle, Flex, HighlightText, Text } from '../components';
import { useGetWorkersDetailQuery, useGoBack, useMediaQuery, useTheme } from '../hooks';
import { formatCurrencyUnit } from '../utils/currencyUnit';

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

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: `${month}월 [원 / ₩]`,
			},
		},
	};

	const chartData = {
		labels: data?.workers.map(worker => worker.workedDate.getDate() + '일'),
		datasets: [
			{
				type: 'bar' as const,
				label: `${workerName}`,
				barPercentage: isTabletScreen ? 0.6 : 0.4,
				data: data?.workers.map(worker => worker.payment),
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
		<Container>
			<GoBackButton type="button" onClick={goBack}>
				<BsArrowLeft size="24" color="var(--bg-color)" />
			</GoBackButton>

			<ProfileContainer>
				<div css={{ position: 'absolute', top: '-8px', left: '-4px' }}>
					<Circle size={20} bgColor="var(--color-green-200)" />
				</div>
				<Flex gap="1rem" justifyContent="space-between" margin="0 0 1rem">
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
	margin-top: 2rem;
`;

const ProfileContainer = styled.div`
	position: relative;
	margin-left: auto;
	margin-top: 2rem;
	margin-bottom: 4rem;
	padding: var(--btn-md-padding);
	width: 40vw;
	border: 1px solid var(--color-gray-300);
	border-radius: var(--radius);
	background-color: var(--option-hover-bg-color);

	@media screen and (max-width: 640px) {
		width: 70vw;
	}
`;

const GoBackButton = styled.button`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: 0.3rem 0.5rem;
	font-weight: 700;
	background-color: var(--btn-hover-color);
	border-radius: var(--radius);
	transition: all 0.3s ease-in-out 0.15s;

	&:hover {
		background-color: var(--option-hover-bg-color);
	}
`;

export default Worker;
