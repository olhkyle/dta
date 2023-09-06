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

	@media screen and (min-width: 640px) {
		width: 640px;
	}

	@media screen and (min-width: 768px) {
		grid-template-columns: 1fr 2fr;
		width: 768px;
	}

	@media screen and (min-width: 1024px) {
		grid-template-columns: 2fr 1.5fr;
		width: 1024px;
	}

	@media screen and (min-width: 1280px) {
		width: 1280px;
	}
`;

export default Main;
