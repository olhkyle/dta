import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { Flex } from '.';

const Footer = () => {
	return (
		<Container>
			<Flex alignItems="flex-end" gap="0.5rem">
				<Logo to={routes.HOME}>
					<img src="./dta.png" alt="logo" />
				</Logo>
				<CopyRight>© TEKT</CopyRight>
			</Flex>
			<MadeBy to={'https://lazykyle.me'}>lazykyle.me</MadeBy>
		</Container>
	);
};

const Container = styled.footer`
	display: flex;
	justify-content: space-between;
	align-items: center;
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
	width: 24px;
	height: 24px;

	img {
		display: block;
		width: 100%;
		height: 100%;
	}

	@media screen and (min-width: 640px) {
		font-size: 18px;
	}
`;

const CopyRight = styled.span`
	font-size: 13px;
	font-weight: 600;

	@media screen and (min-width: 640px) {
		font-size: 16px;
	}
`;

const MadeBy = styled(Link)`
	font-size: 14px;
	font-weight: 600;
	color: var(--color-gray-500);

	&:hover {
		color: var(--color-green-50);
	}

	@media screen and (min-width: 640px) {
		font-size: 16px;
	}
`;

export default Footer;
