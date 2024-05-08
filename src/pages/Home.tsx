import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { Flex, Text } from '../components';
import { useAppSelector } from '../store/store';
import { getUser } from '../store/userSlice';
import routes from '../constants/routes';

const Home = () => {
	const user = useAppSelector(getUser);

	return (
		<Wrapper direction="column" justifyContent="center" gap="1rem">
			<Subtitle color="var(--bg-color)">Document Tax Administration</Subtitle>
			<About>
				<h6>* Goal</h6>
				<p>
					A company in South Korea's Construction Industry is still manually managing data related to payment of wages to day laborers in
					the field. The company realized that the time cost of sifting through the data needed to calculate taxes and the human cost of
					managing the data was being unnecessarily wasted. In order to reduce the unnecessary waste of time, space, and human resources, we
					decided to focus on the work efficiency of data managers and organize related WebApp.
				</p>
				<span></span>
			</About>
			<Navigation to={user ? routes.OVERVIEW : routes.LOGIN} className="clip-path-button">
				서비스 이용하기
			</Navigation>
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
	margin-bottom: 1rem;
	font-size: 22px;
	text-align: center;
	-webkit-text-stroke: 1px var(--text-color);

	@media screen and (min-width: 640px) {
		font-size: 32px;
	}

	@media screen and (min-width: 768px) {
		font-size: 34px;
	}
`;

const About = styled.div`
	position: relative;
	margin-bottom: 1rem;
	padding: 1rem;
	width: 300px;
	font-size: 15px;
	background-color: var(--option-hover-bg-color);
	color: var(--text-color);
	border-radius: var(--radius);

	h6 {
		font-weight: 700;
	}

	span {
		position: absolute;
		top: -12px;
		right: 0;
		width: 24px;
		height: 24px;
		background-color: var(--color-dark);
		border-radius: 9999px;
	}

	@media screen and (min-width: 640px) {
		width: 500px;
	}
`;

const Navigation = styled(NavLink)`
	padding: 1rem;
	min-width: 240px;
	background: linear-gradient(0.25turn, var(--color-green-100), var(--color-green-400));
	color: var(--bg-color);
	font-size: 15px;
	font-weight: 600;
	text-align: center;

	&:hover {
		opacity: 0.8;
	}

	@media screen and (min-width: 640px) {
		flex-direction: row;
		font-size: 17px;
		font-weight: 700;
	}
`;

export default Home;
