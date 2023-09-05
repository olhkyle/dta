import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Flex, ThemeButton } from '.';

import routes from '../../constants/routes';

const Nav = () => {
	return (
		<Container>
			<Logo to={routes.HOME}>
				<h1>Ttax</h1>
			</Logo>
			<Flex justifyContent="space-between">
				<Flex justifyContent="space-between" gap="0.5rem">
					<Details to={routes.DETAILS}>월별 세부 명세</Details>
					<Register to={routes.REGISTER}>일용직 등록</Register>
					<Login to={routes.LOGIN}>로그인</Login>
				</Flex>
				<ThemeButton />
			</Flex>
		</Container>
	);
};

const Container = styled.nav`
	position: sticky;
	top: 0;
	display: grid;
	grid-template-columns: 2fr 1.5fr;
	gap: 1rem;
	margin: 0 auto;
	padding: 0 1rem;
	height: 80px;
	border-bottom: 1px solid;
	backdrop-filter: blur(4px);
	z-index: 9999;

	@media screen and (min-width: 1024px) {
		width: 1024px;
	}

	@media screen and (min-width: 1280px) {
		width: 1280px;
	}
`;

const Logo = styled(Link)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 100px;

	h1 {
		font-size: 36px;
		font-weight: 900;
	}
`;

const SLink = styled(Link)`
	padding: var(--btn-padding);
	font-size: var(--btn-font-size);
	font-weight: 600;
	line-height: 1;
	border-radius: 9999px;
`;

const Details = styled(SLink)`
	&:hover {
		color: var(--btn-hover-color);
	}
`;

const Register = styled(SLink)`
	&:hover {
		color: var(--btn-hover-color);
	}
`;

const Login = styled(SLink)`
	margin-left: 1rem;
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}
`;

export default Nav;
