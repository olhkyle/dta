import styled from '@emotion/styled';

const SkeletonItem = styled.div<{
	width: `${number}px` | `${number}%`;
	height: `${number}px` | `${number}%`;
	theme: 'light' | 'dark';
}>`
	--linear-gradient: linear-gradient(to right, var(--color-green-50), var(--color-gray-50), var(--color-green-50));

	position: relative;
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	background-color: ${({ theme }) =>
		theme === 'light' ? 'var(--skeleton-bg-color)' : theme === 'dark' ? 'var(--skeleton-bg-color)' : 'var(--greyOpactiy50)'};
	border-radius: var(--radius);
	overflow: hidden;

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		inset: 0;
		background: linear-gradient(90deg, transparent 0%, var(--color-gray-200) 50%, transparent 100%);
		background-size: 200% 100%;
		animation: shimmer 2s infinite;
	}
`;

export default SkeletonItem;
