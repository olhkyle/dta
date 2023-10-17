import styled from '@emotion/styled';
import { Button, Flex, NavLink, ThemeButton } from '.';
import routes from '../constants/routes';
import { useAppSelector } from '../store/store';
import { getUser } from '../store/userSlice';
import { useSideNavActive } from '../hooks';

interface SideNavProps {
	onLogout: () => void;
}

const SideNav = ({ onLogout }: SideNavProps) => {
	const username = useAppSelector(getUser);
	const {
		actions: { close },
	} = useSideNavActive();

	return (
		<Container>
			<Flex direction="column" justifyContent="space-between" gap="1rem" margin="1rem 0">
				<Navigation to={routes.OVERVIEW} onClick={close}>
					명세 월별 개요
				</Navigation>
				<Navigation to={routes.DETAILS} onClick={close}>
					명세 월별 상세
				</Navigation>
				<Navigation to={routes.SEARCH_WORKERS} onClick={close}>
					일용직 검색
				</Navigation>
				<Navigation to={routes.REGISTER} onClick={close}>
					일용직 등록
				</Navigation>
				{username ? (
					<LogoutButton
						type="button"
						onClick={() => {
							onLogout();
							close();
						}}>
						로그아웃
					</LogoutButton>
				) : (
					<Login to={routes.LOGIN} onClick={close}>
						로그인
					</Login>
				)}
			</Flex>
			<Flex justifyContent="center" margin="2rem 0">
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
	width: 100%;
	font-size: 18px;
	border-radius: 0;
	border-bottom: 1px solid var(--color-gray-400);
	transition: all 0.1s ease-in-out 0.05s;

	&:hover {
		color: var(--color-green-300);
		border-bottom: 1px solid var(--color-green-300);
	}
`;

const Login = styled(NavLink)`
	width: 100%;
	font-size: 18px;
	border-radius: 0;
	border-bottom: 1px solid var(--color-gray-400);

	&:hover {
		color: var(--color-green-50);
	}
`;

const LogoutButton = styled(Button)`
	padding: var(--btn-md-padding);
	width: 100%;
	font-size: 18px;
	font-weight: 600;
	line-height: 1;
	border-radius: 0;
	border-bottom: 1px solid var(--color-gray-400);
	text-align: center;
	color: var(--text-color);

	&:hover {
		color: var(--color-green-300);
	}

	@media screen and (min-width: 640px) {
		padding: var(--btn-lg-padding);
	}

	@media screen and (min-width: 768px) {
		padding: var(--btn-md-padding);
	}
`;

export default SideNav;
