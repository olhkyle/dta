import { ReactNode } from 'react';
import styled from '@emotion/styled';

const SButton = styled.button`
	padding: 0.6rem 1.2rem;
	border-radius: 8px;
	font-size: 1rem;
	font-weight: 600;
`;

const Button = ({ children, onClick, ...props }: { children: ReactNode; onClick: () => void }) => {
	return (
		<SButton type="button" onClick={onClick} {...props}>
			{children}
		</SButton>
	);
};

export default Button;
