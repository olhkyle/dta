import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface EmptyIndicatorProps {
	children: ReactNode;
}

const EmptyIndicator = ({ children }: EmptyIndicatorProps) => {
	return <Container>{children}</Container>;
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	margin: 5rem auto;
	padding: 4rem 2rem;
	font-size: 16px;
	font-weight: 600;
	text-align: center;
	border-radius: var(--radius);
	outline: 2px solid var(--color-gray-300);

	p {
		margin-top: 1rem;
		font-size: 15px;
		color: var(--color-gray-500);
	}

	@media screen and (min-width: 640px) {
		/* width: 65vw; */
		font-size: 20px;
	}
`;

export default EmptyIndicator;
