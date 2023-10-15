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
	width: 80vw;
	font-size: 16px;
	font-weight: 600;
	text-align: center;
	outline: 2px solid var(--text-color);
	outline-offset: 4px;

	@media screen and (min-width: 640px) {
		flex-direction: row;
		width: 65vw;
		font-size: 20px;
	}
`;

export default EmptyIndicator;
