import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { Flex } from '.';

const Footer = () => {
	return (
		<Container>
			<Flex alignItems="flex-end" gap="0.5rem">
				<Logo to={routes.HOME}>D:T.A</Logo>
				<CopyRight>© 2023 Min-Housing</CopyRight>
			</Flex>
			<MadeBy to={'https://olhkyle.me'}>Olhkyle.me</MadeBy>
		</Container>
	);
};

const Container = styled.footer`
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
	padding: 2rem 1rem;

	border-top: 1px solid var(--outline-color);
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
const Logo = styled(Link)`
	font-size: 18px;
	font-weight: 700;
`;

const CopyRight = styled.span`
	font-weight: 600;
`;

const MadeBy = styled(Link)`
	font-weight: 600;
	color: var(--color-gray-500);

	&:hover {
		color: var(--color-green-50);
	}
`;

export default Footer;
