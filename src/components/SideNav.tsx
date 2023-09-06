import styled from '@emotion/styled';
import { Button, Flex, NavLink, ThemeButton } from '.';
import routes from '../constants/routes';
import { useAppSelector } from '../store/store';
import { getUser } from '../store/userSlice';
import useSideNavActive from '../hooks/useSideNavActive';

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
			<Flex direction="column" justifyContent="space-between" gap="1rem">
				<Details to={routes.DETAILS} onClick={close}>
					월별 세부 명세
				</Details>
				<Register to={routes.REGISTER} onClick={close}>
					일용직 등록
				</Register>
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

const Details = styled(NavLink)`
	margin-top: 1rem;
	width: 100%;
	font-size: 18px;
	border-radius: 0;
	border-bottom: 1px solid var(--color-gray-400);
	&:hover {
		color: var(--color-green-50);
	}
`;

const Register = styled(NavLink)`
	width: 100%;
	font-size: 18px;
	border-radius: 0;
	border-bottom: 1px solid var(--color-gray-400);
	&:hover {
		color: var(--color-green-50);
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
		color: var(--color-green-50);
	}

	@media screen and (min-width: 640px) {
		padding: var(--btn-lg-padding);
	}

	@media screen and (min-width: 768px) {
		padding: var(--btn-md-padding);
	}
`;

export default SideNav;
