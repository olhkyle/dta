import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { RiMenuFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import routes from '../constants/routes';
import { Flex, NavLink, ThemeButton } from './common';
import { SideNav } from '.';
import { useAppSelector } from '../store/store';
import { getIsAdmin, getUser } from '../store/userSlice';
import { logOut } from '../service/auth';
import { UserProfile } from './auth';
import { useSetUser, useSideNavActive } from '../hooks';
import { useEffect } from 'react';

const Nav = () => {
	const navigate = useNavigate();

	const {
		active,
		actions: { toggle, close },
	} = useSideNavActive();
	const username = useAppSelector(getUser);
	const isAdmin = useAppSelector(getIsAdmin);
	const { setLogoutUser } = useSetUser();

	const handleLogout = async () => {
		try {
			await logOut();
			setLogoutUser();
			toast.success('성공적으로 로그아웃 되었습니다.');
		} catch (e) {
			toast.error('문제가 발생하였습니다.');
			console.error(e);
		} finally {
			navigate(routes.HOME);
		}
	};

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, [active]);

	return (
		<>
			<Container>
				<Logo to={routes.HOME} onClick={close}>
					<h1 className="underlined">D:T.A</h1>
				</Logo>
				<NavLinkContainer>
					<Flex justifyContent="space-between" gap="0.25rem">
						<Overview to={routes.OVERVIEW}>명세 개요</Overview>
						<Details to={routes.DETAILS}>월별 세부 명세</Details>
						<Register to={routes.REGISTER}>일용직 등록</Register>
						{username ? <UserProfile name={username} isAdmin={isAdmin} onLogout={handleLogout} /> : <Login to={routes.LOGIN}>로그인</Login>}
					</Flex>
					<ThemeButton />
				</NavLinkContainer>
				<NavToggleButton onClick={toggle}>
					<RiMenuFill size="32" color="var(--text-color)" />
				</NavToggleButton>
			</Container>
			{active && <SideNav onLogout={handleLogout} />}
			{active && <Overlay onClick={close} />}
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
	max-width: 1280px;
	height: 80px;
	border-bottom: 1px solid var(--text-color);
	backdrop-filter: blur(8px);
	z-index: 9900;

	@media screen and (min-width: 768px) {
		grid-template-columns: 1fr 3fr;
	}

	@media screen and (min-width: 1280px) {
		grid-template-columns: 1fr 1fr;
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
	margin: 0.4rem 0 0;

	@media screen and (min-width: 768px) {
		display: flex;
	}
`;

const Overview = styled(NavLink)`
	&:hover {
		color: var(--btn-hover-color);
		transition: all 0.3s ease-in-out 0.15s;
	}
`;

const Details = styled(NavLink)`
	&:hover {
		color: var(--btn-hover-color);
		transition: all 0.3s ease-in-out 0.15s;
	}
`;

const Register = styled(NavLink)`
	&:hover {
		color: var(--btn-hover-color);
		transition: all 0.3s ease-in-out 0.15s;
	}
`;

const Login = styled(NavLink)`
	margin-left: 1rem;
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);

	&:hover {
		background-color: var(--btn-hover-bg-color);
		transition: all 0.3s ease-in-out 0.15s;
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

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	backdrop-filter: blur(10px);
	z-index: 99;
`;

export default Nav;
