import { useState } from 'react';
import styled from '@emotion/styled';
import { CustomSelect, Flex, TotalCost, WorkerExpenseChart, WorkerList, WorkerTotalCount, WorkSpace } from '../components';
import { yearOfToday, years } from '../constants';

const DashboardPage = () => {
	const [currentYear, setCurrentYear] = useState(yearOfToday);

	return (
		<Container>
			<Controller justifyContent={'space-between'} gap={'16px'} margin={'16px auto 0'}>
				<CustomSelect data={years} value={currentYear} setValue={setCurrentYear} unit={'년'} />
			</Controller>
			<DataViews>
				<Overview>
					<TotalCost year={currentYear} />
					<WorkerTotalCount year={currentYear} />
					<WorkSpace year={currentYear} />
				</Overview>
				<ChartAndList>
					<WorkerExpenseChart />
					<WorkerList year={currentYear} />
				</ChartAndList>
			</DataViews>
		</Container>
	);
};

const Container = styled.section`
	padding: 0 var(--padding-md);
	max-width: 1280px;
	width: 100%;
`;

const Controller = styled(Flex)`
	min-height: 60px;
`;

const DataViews = styled.div``;

const Overview = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;
	margin-top: 16px;

	@media screen and (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const ChartAndList = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 32px;
	margin-top: 16px;

	@media screen and (min-width: 768px) {
		grid-template-columns: 2fr 1fr;
	}
`;

export default DashboardPage;
