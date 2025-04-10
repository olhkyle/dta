import { useState } from 'react';
import styled from '@emotion/styled';
import { CustomSelect, EmptyIndicator, Flex, TotalCost, WorkerTotalCount, WorkPlace } from '../components';
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
					<WorkPlace />
				</Overview>
			</DataViews>
			<EmptyIndicator decoration={'🛹'} label={'대시보드 추가 예정입니다'} />
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
	gap: 8px;
	margin-top: 16px;

	@media screen and (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export default DashboardPage;
