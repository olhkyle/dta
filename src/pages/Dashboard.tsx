import styled from '@emotion/styled';
import { EmptyIndicator } from '../components';

const Dashboard = () => {
	return (
		<Container>
			<EmptyIndicator>🛹 대시보드 추가 예정입니다</EmptyIndicator>
		</Container>
	);
};

const Container = styled.div`
	padding: 0 16px;
	max-width: 1280px;
	width: 100%;
`;

export default Dashboard;
