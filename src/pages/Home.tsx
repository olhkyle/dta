import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { Flex, Text } from '../components';
import routes from '../constants/routes';

const Home = () => {
	return (
		<>
			<Wrapper direction="column" justifyContent="center" gap="1rem">
				<SubTitleWrapper justifyContent="center">
					<Subtitle typo="h2" color="var(--text-color)">
						Document Tax Administration
					</Subtitle>
				</SubTitleWrapper>
				<Description gap="1rem">
					<Flex gap="1rem">
						<Text typo="h6" color="var(--text-color)">
							본 서비스는
						</Text>
						<Corporation typo="h6" color="var(--bg-color)">
							민하우징
						</Corporation>
					</Flex>
					<Text typo="h6" color="var(--text-color)">
						관리자에 의해 수정 가능합니다.
					</Text>
				</Description>
			</Wrapper>
			<CustomFlex justifyContent="center" gap="1rem" margin="5rem auto 6rem">
				<Navigation to={routes.OVERVIEW} className="clip-path-button">
					근로소득 명세 월별 개요
				</Navigation>
				<Navigation to={routes.DETAILS} className="clip-path-button">
					근로소득 명세 월별 상세
				</Navigation>
				<Navigation to={routes.REGISTER} className="clip-path-button">
					일용직 등록
				</Navigation>
			</CustomFlex>
		</>
	);
};

const Wrapper = styled(Flex)`
	margin: 3rem 0;

	@media screen and (min-width: 640px) {
		margin: 8rem auto;
	}
`;

const SubTitleWrapper = styled(Flex)`
	margin: 1rem auto 2rem;

	@media screen and (min-width: 640px) {
		margin: 2rem auto 6rem;
	}
`;

const Subtitle = styled(Text)`
	padding: 1rem;
	text-align: center;
	font-size: 32px;

	@media screen and (min-width: 640px) {
		font-size: 48px;
	}
`;

const Description = styled(Flex)`
	flex-direction: column;
	padding: 1rem 1rem 1.5rem;
	border: 1px solid var(--text-color);

	@media screen and (min-width: 640px) {
		flex-direction: row;
		padding: 1.5rem;
	}
`;

const Corporation = styled(Text)`
	padding: 0.5rem 1rem;
	border-radius: 9999px;
	background-color: var(--color-green-50);
`;

const CustomFlex = styled(Flex)`
	flex-direction: column;

	@media screen and (min-width: 640px) {
		flex-direction: row;
	}
`;

const Navigation = styled(NavLink)`
	padding: 1rem;
	min-width: 220px;
	background-color: var(--text-color);
	color: var(--bg-color);
	font-size: 15px;
	font-weight: 600;
	text-align: center;

	&:hover {
		background-color: var(--color-green-300);
	}

	@media screen and (min-width: 640px) {
		flex-direction: row;
		font-size: 18px;
		font-weight: 700;
	}
`;

export default Home;
