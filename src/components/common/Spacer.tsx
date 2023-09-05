import { HTMLAttributes } from 'react';

interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
	direction?: 'vertical' | 'horizontal';
	size: number;
}

const Spacer = ({ direction = 'vertical', size, ...props }: SpacerProps) => {
	return (
		<div
			css={{
				width: direction === 'horizontal' ? `${size}px` : undefined,
				height: direction === 'vertical' ? `${size}px` : undefined,
			}}
			{...props}></div>
	);
};

export default Spacer;
