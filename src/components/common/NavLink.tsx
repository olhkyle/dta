import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { NavLink as Link } from 'react-router-dom';

interface NavLinkProps {
	to: string;
	children: ReactNode;
	onClick?: () => void;
}

const NavLink = ({ to, children, onClick, ...props }: NavLinkProps) => {
	return (
		<StyledLink to={to} onClick={onClick} tabIndex={0} {...props}>
			{children}
		</StyledLink>
	);
};

const StyledLink = styled(Link)`
	padding: var(--btn-sm-padding);
	font-size: 15px;
	font-weight: 600;
	line-height: 1;
	border-radius: var(--radius);
	text-align: center;
	word-break: keep-all;

	@media screen and (min-width: 920px) {
		padding: var(--btn-md-padding);
	}

	@media screen and (min-width: 1024px) {
		font-size: 17px;
	}
`;

export default NavLink;
