import logoImage from '../../assets/dta.webp';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { RiCloseFill } from 'react-icons/ri';
import { PiHamburger } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { Flex, NavLink, ThemeButton, SideNav, UserProfile, LoginLinkLoader } from '..';
import { useAuthQuery, useLoading, useScrollTopEffect, useSetUser, useSideNavActive } from '../../hooks';
import { routes } from '../../constants';
import { logOut } from '../../service/auth';

const Nav = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const {
		active,
		actions: { toggle, close },
	} = useSideNavActive();

	const {
		userData: { name, isAdmin },
		setLogoutUser,
	} = useSetUser();

	const { isLoading: isAuthLoading } = useAuthQuery();
	const { Loading, isLoading, startTransition } = useLoading();

	useScrollTopEffect(active);

	const handleLogout = async () => {
		try {
			await startTransition(logOut());
			setLogoutUser();
			toast.success('성공적으로 로그아웃 되었습니다.');
		} catch (e) {
			toast.error('문제가 발생하였습니다.');
			console.error(e);
		} finally {
			queryClient.setQueryData(['auth'], null);
			navigate(routes.LOGIN);
		}
	};

	return (
		<>
			<Container isAdmin={isAdmin}>
				<Group justifyContent={'space-between'} gap={'16px'} margin={'0 auto'} maxWidth={'1280px'}>
					<Logo to={routes.OVERVIEW} onClick={close} aria-label="logo">
						<h1 className="underlined">
							<img src={logoImage} alt="logo" />
						</h1>
					</Logo>
					<NavLinkContainer justifyContent={'space-between'} alignItems={'center'} gap={'48px'} margin={'0.4rem 0 0'}>
						<Flex justifyContent={'space-between'} gap={'4px'}>
							{isAdmin && <Navigation to={routes.OVERVIEW}>월별 개요</Navigation>}
							{isAdmin && <Navigation to={routes.DETAILS}>월별 상세</Navigation>}
							{isAdmin && <Navigation to={routes.REGISTER}>일용직 등록</Navigation>}
							{isAuthLoading ? (
								<LoginLinkLoader />
							) : !name ? (
								<LoginLink to={routes.LOGIN}>로그인</LoginLink>
							) : (
								<UserProfile name={name} isAdmin={isAdmin} onLogout={handleLogout} isLoading={isLoading} Loading={Loading} />
							)}
						</Flex>
						<ThemeButton />
					</NavLinkContainer>
					<NavToggleButton onClick={toggle} aria-label="side-navigation-toggle-button">
						{active ? <RiCloseFill size="35" color="var(--text-color)" /> : <PiHamburger size="32" color="var(--text-color)" />}
					</NavToggleButton>
				</Group>
			</Container>
			<SideNav isShown={active} onLogout={handleLogout} isLoading={isLoading} Loading={Loading} />
			<Overlay isShown={active} onClick={close} />
		</>
	);
};

const Container = styled.nav<{ isAdmin: boolean }>`
	position: sticky;
	top: 0;
	width: 100%;
	border-bottom: 1px solid var(--outline-color);
	backdrop-filter: blur(8px);
	z-index: var(--nav-index);
`;

const Group = styled(Flex)`
	min-height: var(--nav-height);

	@media screen and (min-width: 640px) {
		padding: 0 16px;
	}
`;

const Logo = styled(Link)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: var(--padding-md);

	h1 {
		width: 45px;
		height: 45px;

		img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	@media screen and (min-width: 640px) {
		padding: 0;
	}
`;

const NavLinkContainer = styled(Flex)`
	display: none;

	@media screen and (min-width: 768px) {
		display: flex;
	}
`;

const Navigation = styled(NavLink)`
	transition: background 0.15s ease-in-out;

	&:hover {
		color: var(--btn-hover-color);
		background-color: var(--option-hover-bg-color);
	}
`;

const LoginLink = styled(NavLink)`
	margin-left: 16px;
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);
	transition: background 0.3s ease-in-out 0.15s;

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}
`;

const NavToggleButton = styled.button`
	display: inline-flex;
	align-items: center;
	margin-left: auto;
	margin-right: 16px;

	@media screen and (min-width: 768px) {
		display: none;
	}
`;

const Overlay = styled.div<{ isShown: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: ${({ isShown }) => (isShown ? 'block' : 'none')};
	width: 100dvw;
	height: ${({ isShown }) => (isShown ? '100%' : '0')};
	backdrop-filter: blur(4px);
	opacity: ${({ isShown }) => (isShown ? '100%' : '0')};
	z-index: calc(var(--nav-index) - 10);
	transition: opacity 0.3s cubic-bezier(0.4, 0, 0.4, 1);
`;

export default Nav;
