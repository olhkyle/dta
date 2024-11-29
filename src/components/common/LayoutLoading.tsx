import styled from '@emotion/styled';
import { Flex } from '.';

interface LoadingProps {
	type?: 'md' | 'lg';
}

type LoadingSvgProps = Omit<LoadingProps, 'margin'>;

const LoadingSvg = ({ type = 'md' }: LoadingSvgProps) => (
	<Svg
		type={type}
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		css={{
			display: 'block',
			margin: 'auto',
			background: 'none',
			shapeRendering: 'auto',
		}}
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid">
		<circle cx="50" cy="50" fill="none" stroke="#46df8e" strokeWidth="7" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
			<animateTransform
				attributeName="transform"
				type="rotate"
				repeatCount="indefinite"
				dur="1s"
				values="0 50 50;360 50 50"
				keyTimes="0;1"
			/>
		</circle>
	</Svg>
);

const LayoutLoading = ({ type = 'md' }: LoadingProps) => {
	return (
		<Flex margin="0 auto" width={'100dvw'} height={'calc(100dvh - var(--nav-height) - var(--footer-height))'}>
			<LoadingSvg type={type} />
		</Flex>
	);
};

const Svg = styled.svg<{ type: string }>`
	width: ${({ type }) => (type === 'md' ? '24px' : '36px')};
	height: ${({ type }) => (type === 'md' ? '24px' : '36px')};
`;

export default LayoutLoading;
