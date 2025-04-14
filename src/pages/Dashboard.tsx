import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { CustomSelect, DashboardContent, DashboardContentLoader, Flex } from '../components';
import { yearOfToday, years } from '../constants';

const DashboardPage = () => {
	const [currentYear, setCurrentYear] = useState(yearOfToday);

	return (
		<Container>
			<Controller justifyContent={'space-between'} gap={'16px'}>
				<CustomSelect data={years} value={currentYear} setValue={setCurrentYear} unit={'년'} />
			</Controller>
			<Suspense fallback={<DashboardContentLoader />}>
				<DashboardContent year={currentYear} />
			</Suspense>
		</Container>
	);
};

const Container = styled.section`
	margin: 16px auto 0;
	padding: 0 var(--padding-md);
	max-width: 1280px;
	width: 100%;

	@media screen and (min-width: 640px) {
		margin-top: 64px;
	}
`;

const Controller = styled(Flex)`
	min-height: 60px;
`;

export default DashboardPage;
