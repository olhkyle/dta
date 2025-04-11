import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { Flex, Text } from '../components';
import { useAppSelector } from '../store/store';
import { getUser } from '../store/userSlice';
import { routes } from '../constants';

const HomePage = () => {
	const user = useAppSelector(getUser);

	return (
		<Container direction={'column'} justifyContent={'center'} gap={'16px'}>
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
		</Container>
	);
};

const Container = styled(Flex)`
	margin: 12dvh 0;

	@media screen and (min-width: 1024px) {
		margin: 16dvh auto;
	}
`;

const Subtitle = styled(Text)`
	margin-bottom: 16px;
	font-size: 22px;
	text-align: center;
	-webkit-text-stroke: 1px var(--text-color);

	@media screen and (min-width: 640px) {
		font-size: var(--fz-h4);
	}

	@media screen and (min-width: 768px) {
		font-size: var(--fz-h3);
	}
`;

const About = styled.div`
	position: relative;
	margin-bottom: 16px;
	padding: var(--padding-md);
	width: 300px;
	font-size: var(--fz-p);
	background-color: var(--btn-hover-light-bg-color);
	color: var(--text-color);
	border-radius: var(--radius);

	h6 {
		font-weight: var(--fw-bold);
	}

	span {
		position: absolute;
		top: -12px;
		right: 0;
		width: 24px;
		height: 24px;
		background-color: var(--color-dark);
		border-radius: var(--radius-extra);
	}

	@media screen and (min-width: 640px) {
		width: 500px;
	}
`;

const Navigation = styled(NavLink)`
	padding: var(--padding-md);
	min-width: 240px;
	background: linear-gradient(0.25turn, var(--color-green-100), var(--color-green-400));
	color: var(--bg-color);
	font-size: var(--fz-p);
	font-weight: var(--fw-semibold);
	text-align: center;
	transition: opacity 0.15s ease-in-out;

	&:hover {
		opacity: 0.8;
	}

	@media screen and (min-width: 640px) {
		flex-direction: row;
		font-size: var(--fz-h7);
		font-weight: var(--fw-bold);
	}
`;

export default HomePage;
