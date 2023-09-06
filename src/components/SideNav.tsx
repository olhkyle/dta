import styled from '@emotion/styled';
import { Flex, NavLink } from '.';
import routes from '../constants/routes';

const SideNav = () => {
	return (
		<Container>
			<Flex direction="column" justifyContent="space-between" gap="1rem" padding="1rem 0">
				<Details to={routes.DETAILS}>월별 세부 명세</Details>
				<Register to={routes.REGISTER}>일용직 등록</Register>
				<Login to={routes.LOGIN}>로그인</Login>
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

	@media screen and (min-width: 768px) {
		display: none;
	}
`;

const Details = styled(NavLink)`
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

export default SideNav;
