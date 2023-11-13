import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { Flex, Text } from '../components';
import { useAppSelector } from '../store/store';
import { getIsAdmin } from '../store/userSlice';
import routes from '../constants/routes';

const Home = () => {
	const isAdmin = useAppSelector(getIsAdmin);

	return (
		<Wrapper direction="column" justifyContent="center" gap="1rem">
			<Subtitle typo="h5" color="var(--bg-color)">
				Document Tax Administration
			</Subtitle>
			<Image3D>
				<source srcSet={'/3d_low.webp'} type="image/webp" media={'(min-width: 1024px)'} />
				<img src={'/3d_low.png'} sizes="(max-width: 768px) 270px, 330px" alt="3d image" placeholder="blur" />
			</Image3D>

			{!isAdmin && (
				<Description gap="1rem">
					<Flex gap="0.5rem">
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
			)}

			<CustomFlex justifyContent="center" gap="1rem" margin="3rem auto">
				<Navigation to={routes.OVERVIEW} className="clip-path-button">
					근로소득 명세 월별 개요
				</Navigation>
				<Navigation to={routes.DETAILS} className="clip-path-button">
					근로소득 명세 월별 상세
				</Navigation>
				{isAdmin && (
					<Navigation to={routes.SEARCH_WORKERS} className="clip-path-button">
						일용직 검색
					</Navigation>
				)}
				<Navigation to={routes.REGISTER} className="clip-path-button">
					일용직 등록
				</Navigation>
			</CustomFlex>
		</Wrapper>
	);
};

const Wrapper = styled(Flex)`
	margin: 12vh 0;

	@media screen and (min-width: 1024px) {
		margin: 16vh auto;
	}
`;

const Subtitle = styled(Text)`
	font-size: 27px;
	text-align: center;
	-webkit-text-stroke: 1px var(--text-color);

	@media screen and (min-width: 640px) {
		font-size: 36px;
	}

	@media screen and (min-width: 768px) {
		font-size: 36px;
	}
`;

const Image3D = styled.picture`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
	width: 270px;

	@media screen and (min-width: 768px) {
		width: 330px;
	}

	div {
		width: 100%;
		height: 100%;
		background-color: var(--outline-color);
	}

	img {
		width: 100%;
		height: 100%;
	}
`;

const Description = styled(Flex)`
	flex-direction: column;
	padding: 2rem 1.5rem;
	color: var(--bg-color);
	border: 1px solid var(--text-color);
	border-radius: var(--radius);
	outline: 3px solid var(--outline-color);
	outline-offset: 2px;

	div {
		font-size: 14px;
	}

	div div {
		font-size: 14px;
	}

	@media screen and (min-width: 640px) {
		padding: 2rem 4rem;

		div {
			font-size: 16px;
		}

		div div {
			font-size: 16px;
		}
	}
`;

const Corporation = styled(Text)`
	padding: 0.5rem 1rem;
	border-radius: 9999px;
	background-color: var(--text-color);
`;

const CustomFlex = styled(Flex)`
	flex-direction: column;

	@media screen and (min-width: 1024px) {
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
