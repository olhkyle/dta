import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { NavLink as Link } from 'react-router-dom';

interface NavLinkProps {
	to: string;
	children: ReactNode;
	onClick?: () => void;
}

const NavLink = ({ to, children, onClick, ...props }: NavLinkProps) => {
	return (
		<StyledLink to={to} onClick={onClick} {...props}>
			{children}
		</StyledLink>
	);
};

const StyledLink = styled(Link)`
	padding: var(--btn-md-padding);
	font-size: var(--btn-font-size);
	font-weight: 600;
	line-height: 1;
	border-radius: 9999px;
	text-align: center;

	@media screen and (min-width: 640px) {
		padding: var(--btn-lg-padding);
	}

	@media screen and (min-width: 768px) {
		padding: var(--btn-md-padding);
	}
`;

export default NavLink;
