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
	padding: var(--padding-sm) var(--padding-md);
	font-size: var(--fz-p);
	font-weight: var(--fw-semibold);
	border-radius: var(--radius);
	text-align: center;
	word-break: keep-all;

	@media screen and (min-width: 920px) {
		padding: calc(var(--padding-md) * 0.75) calc(var(--padding-md) * 1.25);
	}

	@media screen and (min-width: 1024px) {
		font-size: var(--fz-rp);
	}
`;

export default NavLink;
