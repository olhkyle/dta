import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Flex, NavLink, Text, ThemeButton } from '.';
import { useAppSelector } from '../store/store';
import { getIsAdmin, getUser } from '../store/userSlice';
import { useClickOutside, useSideNavActive } from '../hooks';
import routes from '../constants/routes';

interface SideNavProps {
	onLogout: () => void;
}

const SideNav = ({ onLogout }: SideNavProps) => {
	const username = useAppSelector(getUser);
	const isAdmin = useAppSelector(getIsAdmin);

	const [isProfileClicked, setIsProfileClicked] = useState<boolean>(false);

	const {
		actions: { close },
	} = useSideNavActive();

	const ref = useClickOutside(() => setIsProfileClicked(false));

	return (
		<Container>
			<Flex direction="column" justifyContent="space-between">
				<Navigation to={routes.OVERVIEW} onClick={close}>
					월별 개요 명세
				</Navigation>
				<Navigation to={routes.DETAILS} onClick={close}>
					월별 상세 명세
				</Navigation>
				{isAdmin && (
					<Navigation to={routes.SEARCH_WORKERS} onClick={close}>
						일용직 검색
					</Navigation>
				)}
				<Navigation to={routes.REGISTER} onClick={close}>
					일용직 등록
				</Navigation>
			</Flex>
			<Flex justifyContent="space-between" margin="2rem 0" padding="0 1.5rem">
				{username ? (
					<Name
						ref={ref}
						onClick={() => {
							setIsProfileClicked(!isProfileClicked);
						}}>
						<Text typo="h6" color="var(--text-color)">
							👨‍🚀 {username}
						</Text>
						{isProfileClicked && (
							<LogoutButton
								type="button"
								onClick={() => {
									onLogout();
									close();
								}}>
								로그아웃
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
	border-bottom: 1px solid var(--color-gray-400);
	transition: all 0.1s ease-in-out 0.05s;

	&:hover {
		color: var(--color-green-300);
		border-top: 1px solid var(--color-green-300);
		border-bottom: 1px solid var(--color-green-300);
	}
`;

const Login = styled(NavLink)`
	font-size: 18px;
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
	width: 120px;
	font-size: 14px;
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
