import { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Flex, NavLink, Text, ThemeButton } from '..';
import { useClickOutside, useMediaQuery, useSetUser, useSideNavActive } from '../../hooks';
import { routes } from '../../constants';

interface SideNavProps {
	isShown: boolean;
	isLoading: boolean;
	Loading: () => ReactNode;
	onLogout: () => void;
}

const SideNav = ({ isShown, isLoading, Loading, onLogout }: SideNavProps) => {
	const {
		userData: { isAdmin, name },
	} = useSetUser();

	const [isProfileClicked, setIsProfileClicked] = useState<boolean>(false);

	const {
		actions: { close },
	} = useSideNavActive();

	const ref = useClickOutside<HTMLDivElement>(() => setIsProfileClicked(false));

	const isDesktop = useMediaQuery('(min-width: 768px)');

	useEffect(() => {
		if (isDesktop) {
			close();
		}
	}, [isDesktop]);

	return (
		<Container isShown={isShown}>
			<Flex direction={'column'} justifyContent={'space-between'}>
				{isAdmin && (
					<Navigation to={routes.OVERVIEW} onClick={close}>
						월별 개요 명세
					</Navigation>
				)}
				{isAdmin && (
					<Navigation to={routes.DETAILS} onClick={close}>
						월별 상세 명세
					</Navigation>
				)}
				{isAdmin && (
					<Navigation to={routes.REGISTER} onClick={close}>
						일용직 등록
					</Navigation>
				)}
			</Flex>
			<Flex justifyContent={'space-between'} margin={'18px 0'} padding={'0 calc(var(--padding-md) * 1.5)'}>
				{name ? (
					<Name
						ref={ref}
						onClick={() => {
							setIsProfileClicked(!isProfileClicked);
						}}>
						<Text typo={'h7'} color={'var(--text-color)'}>
							👨‍🚀 {name}
						</Text>
						{isProfileClicked && (
							<LogoutButton
								type="button"
								onClick={() => {
									onLogout();
									close();
								}}>
								{isLoading ? <Loading /> : '로그아웃'}
							</LogoutButton>
						)}
					</Name>
				) : (
					<Login to={routes.LOGIN} onClick={close}>
						로그인
					</Login>
				)}
				<ThemeButton />
			</Flex>
		</Container>
	);
};

const Container = styled.div<{ isShown: boolean }>`
	position: fixed;
	top: var(--nav-height);
	left: 0;
	max-height: ${({ isShown }) => (isShown ? '60%' : '0')};
	width: 100%;
	background-color: var(--bg-color);
	border-top: ${({ isShown }) => (isShown ? '1px solid var(--color-gray-opacity-200)' : 'none')};
	border-bottom: ${({ isShown }) => (isShown ? '1px solid var(--color-gray-opacity-200)' : 'none')};
	overflow: ${({ isShown }) => (isShown ? 'visible' : 'hidden')};
	z-index: var(--sideNav-index);
	transition: max-height 0.3s ease-out;

	@media screen and (min-width: 768px) {
		display: none;
	}
`;

const Navigation = styled(NavLink)`
	padding: var(--padding-md) 0;
	width: 100%;
	font-size: var(--fz-h7);
	border-radius: 0;
	border-top: 1px solid #fff;
	border-bottom: 1px solid var(--color-gray-opacity-200);
	transition: all 0.1s ease-in-out 0.05s;

	&:hover {
		color: var(--color-green-300);
		border-bottom: 1px solid var(--color-green-300);
	}
`;

const Login = styled(NavLink)`
	font-size: var(--fz-p);
	border: 1px solid var(--outline-color);
	border-radius: 8px;
	outline-offset: 2px;

	&:hover {
		color: var(--color-green-50);
		outline: 1px solid var(--color-green-50);
	}
`;

const Name = styled.div`
	position: relative;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: var(--btn-sm-padding);
	width: 120px;
	border: 1px solid var(--outline-color);
	border-radius: 8px;
	outline: 1px solid var(--color-green-50);
	outline-offset: 2px;
	cursor: pointer;
`;

const LogoutButton = styled(Button)`
	position: absolute;
	bottom: -50px;
	padding: var(--btn-md-padding);
	width: 100%;
	min-width: 120px;
	font-size: var(--fz-sm);
	font-weight: var(--fw-medium);
	line-height: 1;
	color: var(--text-color);
	background-color: var(--bg-color);
	border-radius: 8px;
	border: 1px solid var(--table-border-color);
	text-align: center;
	transition: font-weight 0.15s ease-in-out;

	&:hover {
		font-weight: var(--fw-semibold);
	}

	@media screen and (min-width: 768px) {
		font-size: var(--fz-h7);
	}
`;

export default SideNav;
