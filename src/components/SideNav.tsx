import { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Flex, NavLink, Text, ThemeButton } from '.';
import { useClickOutside, useMediaQuery, useSetUser, useSideNavActive } from '../hooks';
import routes from '../constants/routes';

interface SideNavProps {
	isLoading: boolean;
	Loading: () => ReactNode;
	onLogout: () => void;
}

const SideNav = ({ isLoading, Loading, onLogout }: SideNavProps) => {
	const {
		userData: { isAdmin, name },
	} = useSetUser();

	const [isProfileClicked, setIsProfileClicked] = useState<boolean>(false);

	const {
		actions: { close },
	} = useSideNavActive();

	const ref = useClickOutside(() => setIsProfileClicked(false));

	const isDesktop = useMediaQuery('(min-width: 768px)');

	useEffect(() => {
		if (isDesktop) {
			console.log('isDesktop');
			close();
		}
	}, [isDesktop]);

	return (
		<Container>
			<Flex direction="column" justifyContent="space-between">
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
					<Navigation to={routes.SEARCH_WORKERS} onClick={close}>
						일용직 검색
					</Navigation>
				)}
				{isAdmin && (
					<Navigation to={routes.REGISTER} onClick={close}>
						일용직 등록
					</Navigation>
				)}
			</Flex>
			<Flex justifyContent="space-between" margin="18px 0" padding="0 24px">
				{name ? (
					<Name
						ref={ref}
						onClick={() => {
							setIsProfileClicked(!isProfileClicked);
						}}>
						<Text typo="h7" color="var(--text-color)">
							👨‍🚀 {name}
						</Text>
						{isProfileClicked && (
							<LogoutButton
								type="button"
								onClick={() => {
									onLogout();
									close();
								}}>
								{isLoading ? Loading() : '로그아웃'}
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

const Container = styled.div`
	position: absolute;
	top: 80px;
	left: 0;
	width: 100%;
	background-color: var(--bg-color);
	border-top: 1px solid var(--color-gray-opacity-200);
	border-bottom: 1px solid var(--color-gray-opacity-200);
	z-index: 999;

	@media screen and (min-width: 768px) {
		display: none;
	}
`;

const Navigation = styled(NavLink)`
	padding: 1rem 0;
	width: 100%;
	font-size: 18px;
	border-radius: 0;
	border-top: 1px solid #fff;
	border-bottom: 1px solid var(--color-gray-opacity-200);
	transition: all 0.1s ease-in-out 0.05s;

	&:hover {
		color: var(--color-green-300);
		border-top: 1px solid var(--color-green-300);
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
	left: -5px;
	padding: var(--btn-md-padding);
	width: 100%;
	min-width: 120px;
	font-size: var(--fz-sm);
	font-weight: 500;
	line-height: 1;
	color: var(--text-color);
	background-color: var(--bg-color);
	border-radius: 8px;
	border: 1px solid var(--outline-color);
	text-align: center;

	&:hover {
		color: var(--color-green-300);
	}

	@media screen and (min-width: 640px) {
		padding: var(--btn-lg-padding);
		font-size: 18px;
	}

	@media screen and (min-width: 768px) {
		padding: var(--btn-md-padding);
	}
`;

export default SideNav;
