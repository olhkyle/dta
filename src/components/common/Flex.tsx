import { HTMLAttributes } from 'react';

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
	direction?: 'row' | 'column';
	justifyContent?: 'flex-start' | 'flex-end' | 'space-between' | 'center' | 'space-around';
	alignItems?: 'flex-start' | 'flex-end' | 'center';
	gap?: string;
	margin?: string;
	padding?: string;
	width?: `${number}px` | `${number}%` | `${number}dvw` | 'auto';
	height?: `${number}px` | `${number}%` | `${number}dvh` | 'auto' | string;
}

const Flex = ({
	direction = 'row',
	justifyContent = 'flex-start',
	alignItems = 'center',
	gap = '0',
	margin = '0px',
	padding = '0px',
	width = 'auto',
	height = 'auto',
	...props
}: FlexProps) => {
	return (
		<div
			css={{
				display: 'flex',
				flexDirection: direction,
				justifyContent,
				alignItems,
				margin,
				padding,
				gap,
				width: `${width}`,
				height: `${height}`,
			}}
			{...props}
		/>
	);
};

export default Flex;
