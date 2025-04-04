import styled from '@emotion/styled';
import { RxArrowUp } from 'react-icons/rx';
import { useScroll } from '../../hooks';

interface ScrollToTopButtonProps {
	topPosToShow: number;
}

const ScrollToTopButton = ({ topPosToShow = 500 }: ScrollToTopButtonProps) => {
	const yOffset = useScroll();

	return (
		<>
			{yOffset >= topPosToShow && (
				<Container type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="scroll-top-button">
					<RxArrowUp size="24" color="var(--text-color)" />
				</Container>
			)}
		</>
	);
};

const Container = styled.button`
	position: fixed;
	bottom: 64px;
	right: 4dvw;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: calc(var(--padding-md) * 0.5);
	border: 1px solid var(--outline-color);
	border-radius: calc(var(--radius) * 1.5);
	background-color: var(--bg-color);

	&:hover {
		border-color: var(--color-gray-500);
	}
`;

export default ScrollToTopButton;
