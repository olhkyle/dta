import styled from '@emotion/styled';
import { Flex } from '.';

const Loading = () => {
	return (
		<Flex justifyContent="center" margin="5rem 0">
			<Svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				css={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }}
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
		</Flex>
	);
};

const Svg = styled.svg`
	width: 60px;
	height: 60px;

	@media screen and (min-width: 640px) {
		width: 80px;
		height: 80px;
	}
`;

export default Loading;
