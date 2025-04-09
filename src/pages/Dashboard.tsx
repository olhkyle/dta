import styled from '@emotion/styled';
import { EmptyIndicator } from '../components';

const DashboardPage = () => {
	return (
		<Container>
			<EmptyIndicator decoration={'🛹'} label={'대시보드 추가 예정입니다'} />
		</Container>
	);
};

const Container = styled.section`
	padding: 0 var(--padding-md);
	max-width: 1280px;
	width: 100%;
`;

export default DashboardPage;
