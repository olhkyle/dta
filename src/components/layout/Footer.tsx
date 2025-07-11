import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Flex } from '..';
import { url } from '../../constants';

const Footer = () => {
	return (
		<Container>
			<Flex justifyContent={'space-between'} width={'100%'} maxWidth={'1280px'}>
				<CopyRight>© radial</CopyRight>
				<MadeBy to={url.MY_WEBSITE}>kwonkyle.app</MadeBy>
			</Flex>
		</Container>
	);
};

const Container = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	padding: 0 var(--padding-md);
	width: 100%;
	min-height: var(--footer-height);
	border-top: 1px solid var(--border-color);
`;

const CopyRight = styled.span`
	font-size: var(--fz-sm);
	font-weight: var(--fw-semibold);

	@media screen and (min-width: 640px) {
		font-size: var(--fz-rp);
	}
`;

const MadeBy = styled(Link)`
	font-size: var(--fz-m);
	font-weight: var(--fw-semibold);
	color: var(--color-gray-500);

	&:hover {
		color: var(--color-green-50);
	}

	@media screen and (min-width: 640px) {
		font-size: var(--fz-rp);
	}
`;

export default Footer;
