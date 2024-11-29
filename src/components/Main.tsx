import { HTMLAttributes, ReactNode } from 'react';
import styled from '@emotion/styled';

interface MainProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
}

const Main = ({ children }: MainProps) => {
	return <Container>{children}</Container>;
};

const Container = styled.main`
	display: flex;
	justify-content: center;
	margin: 0 auto;
	max-width: 1280px;
	width: 100%;
	height: 100%;
	min-height: calc(100dvh - var(--nav-height) - var(--footer-height));
`;

export default Main;
