import styled from '@emotion/styled';
import routes from '../constants/routes';
import { Flex, NavLink, ThemeButton } from './common';
import { RiMenuFill } from 'react-icons/ri';
import { SideNav } from '.';
import useSideNavActive from '../hooks/useSideNavActive';

const Nav = () => {
	const [active, toggle] = useSideNavActive();

	return (
		<>
			<Container>
				<Logo to={routes.HOME} onClick={toggle}>
					<h1>Ttax</h1>
				</Logo>
				<NavLinkContainer>
					<Flex justifyContent="space-between" gap="0.5rem">
						<Details to={routes.DETAILS}>월별 세부 명세</Details>
						<Register to={routes.REGISTER}>일용직 등록</Register>
						<Login to={routes.LOGIN}>로그인</Login>
					</Flex>
					<ThemeButton />
				</NavLinkContainer>
				<NavToggleButton onClick={toggle}>
					<RiMenuFill size="32" color="var(--text-color)" />
				</NavToggleButton>
			</Container>
			{active && <SideNav />}
			{/* TODO: overlay */}
		</>
	);
};

const Container = styled.nav`
	position: sticky;
	top: 0;
	display: grid;
	grid-template-columns: 4fr 1fr;
	gap: 1rem;
	margin: 0 auto;
	padding: 0 1rem;
	height: 80px;
	border-bottom: 1px solid;
	backdrop-filter: blur(4px);
	z-index: 9999;

	@media screen and (min-width: 640px) {
		width: 640px;
	}

	@media screen and (min-width: 768px) {
		grid-template-columns: 1fr 2fr;
		width: 768px;
	}

	@media screen and (min-width: 1024px) {
		grid-template-columns: 2fr 1.5fr;
		width: 1024px;
	}

	@media screen and (min-width: 1280px) {
		width: 1280px;
	}
`;

const Logo = styled(NavLink)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 100px;

	h1 {
		font-size: 36px;
		font-weight: 900;
	}
`;

const NavLinkContainer = styled.div`
	display: none;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;

	@media screen and (min-width: 768px) {
		display: flex;
	}
`;

const Details = styled(NavLink)`
	&:hover {
		color: var(--btn-hover-color);
	}
`;

const Register = styled(NavLink)`
	&:hover {
		color: var(--btn-hover-color);
	}
`;

const Login = styled(NavLink)`
	margin-left: 1rem;
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}
`;

const NavToggleButton = styled.button`
	display: inline-flex;
	align-items: center;
	margin-left: auto;
	margin-right: 1rem;
	@media screen and (min-width: 768px) {
		display: none;
	}
`;

export default Nav;
