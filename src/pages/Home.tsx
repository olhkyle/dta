import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { Flex, Text } from '../components';
import routes from '../constants/routes';

const Home = () => {
	return (
		<>
			<Flex direction="column" justifyContent="center" gap="1rem" margin="10rem auto">
				<Flex justifyContent="center" margin="2rem auto 6rem">
					<Subtitle typo="h2" color="var(--text-color)">
						Document Tax Administration
					</Subtitle>
				</Flex>
				<Description gap="1rem">
					<Flex gap="1rem">
						<Text typo="h5" color="var(--text-color)">
							본 서비스는
						</Text>
						<Corporation typo="h4" color="var(--bg-color)">
							민하우징
						</Corporation>
					</Flex>
					<Text typo="h5" color="var(--text-color)">
						관리자만이 이용 가능합니다.
					</Text>
				</Description>
			</Flex>
			<CustomFlex justifyContent="center" gap="1rem" margin="5rem auto 6rem">
				<Navigation to={routes.OVERVIEW}>근로소득 명세 월별 개요</Navigation>
				<Navigation to={routes.DETAILS}>근로소득 명세 월별 상세</Navigation>
				<Navigation to={routes.REGISTER}>일용직 등록</Navigation>
			</CustomFlex>
		</>
	);
};

const Subtitle = styled(Text)`
	padding: 1rem;
	text-align: center;
`;

const Navigation = styled(NavLink)`
	padding: 1rem;
	background-color: var(--text-color);
	color: var(--bg-color);
	font-size: 18px;
	font-weight: 700;
	border: 1px solid var(--bg-color);

	&:hover {
		background-color: var(--bg-color);
		color: var(--text-color);
		outline: 2px solid var(--color-green-50);
	}
`;

const Description = styled(Flex)`
	flex-direction: column;
	padding: 2rem;
	border: 1px solid var(--text-color);
	outline: 2px solid var(--outline-color);
	outline-offset: 4px;

	@media screen and (min-width: 640px) {
		flex-direction: row;
	}
`;

const Corporation = styled(Text)`
	padding: 1rem;
	border-radius: 9999px;
	background-color: var(--color-green-50);
`;

const CustomFlex = styled(Flex)`
	flex-direction: column;

	@media screen and (min-width: 640px) {
		flex-direction: row;
	}
`;

export default Home;
