import { HTMLAttributes, ReactNode } from 'react';
import styled from '@emotion/styled';

interface MainProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
}

const Main = ({ children }: MainProps) => {
	return <Container>{children}</Container>;
};

const Container = styled.main`
	margin: 0 auto;
	padding: 0 1rem 5rem 1rem;
	max-width: 1280px;
	width: 100%;
	min-height: calc(100dvh - var(--nav-height) - var(--footer-height));
`;

export default Main;
