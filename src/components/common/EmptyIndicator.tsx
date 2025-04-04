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
	gap: var(--padding-sm);
	margin: 80px auto;
	padding: 64px 32px;
	min-height: 320px;
	font-size: var(--fz-rp);
	font-weight: var(--fw-semibold);
	text-align: center;
	border-radius: var(--radius);
	outline: 1px solid var(--color-gray-200);

	p {
		margin-top: 16px;
		font-size: var(--fz-p);
		color: var(--color-gray-500);
	}

	@media screen and (min-width: 640px) {
		font-size: var(--fz-h6);
	}
`;

export default EmptyIndicator;
