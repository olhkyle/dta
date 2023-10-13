import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { Flex, Spacer, Text, Wip } from '../components';
import routes from '../constants/routes';

const Home = () => {
	return (
		<>
			<Wrapper direction="column" justifyContent="center" gap="1rem">
				<Flex direction="column" margin="1rem auto">
					<Subtitle typo="h5" color="var(--bg-color)">
						Document Tax Administration
					</Subtitle>
				</Flex>
				<Spacer size={16} />
				<Wip bgColor="var(--color-gray-500)">
					<Description gap="1rem">
						<Flex gap="0.5rem">
							<Text typo="h6" color="var(--color-white)">
								본 서비스는
							</Text>
							<Corporation typo="h6" color="var(--color-white)">
								민하우징
							</Corporation>
						</Flex>
						<Text typo="h6" color="var(--color-white)">
							관리자에 의해 수정 가능합니다.
						</Text>
					</Description>
				</Wip>
				<CustomFlex justifyContent="center" gap="1rem" margin="3rem auto">
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
			</Wrapper>
		</>
	);
};

const Wrapper = styled(Flex)`
	margin: 10vh 0;

	@media screen and (min-width: 640px) {
		margin: 20vh auto;
	}
`;

const Subtitle = styled(Text)`
	text-align: center;
	-webkit-text-stroke: 1px var(--text-color);

	@media screen and (min-width: 640px) {
		font-size: 24px;
	}

	@media screen and (min-width: 768px) {
		font-size: 36px;
	}
`;

const Description = styled(Flex)`
	flex-direction: column;
	padding: 0.5rem 1rem 0.5rem;
	color: var(--bg-color);
`;

const Corporation = styled(Text)`
	padding: 0.5rem 1rem;
	border-radius: 9999px;
	background-color: var(--color-dark);
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
		background-color: var(--btn-hover-bg-color);
	}

	@media screen and (min-width: 640px) {
		flex-direction: row;
		font-size: 18px;
		font-weight: 700;
	}
`;

export default Home;
