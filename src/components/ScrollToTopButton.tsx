import styled from '@emotion/styled';
import { RxArrowUp } from 'react-icons/rx';
import { useScroll } from '../hooks';

interface ScrollToTopButtonProps {
	topPosToShow: number;
}

const ScrollToTopButton = ({ topPosToShow = 500 }: ScrollToTopButtonProps) => {
	const yOffset = useScroll();

	return (
		<>
			{yOffset >= topPosToShow && (
				<Container type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
					<RxArrowUp size="24" color="var(--text-color)" />
				</Container>
			)}
		</>
	);
};

const Container = styled.button`
	position: fixed;
	bottom: 2rem;
	right: 4vw;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: 0.65rem;
	border: 1px solid var(--outline-color);
	border-radius: calc(var(--radius) * 1.5);

	&:hover {
		border-color: var(--color-gray-500);
	}
`;

export default ScrollToTopButton;
