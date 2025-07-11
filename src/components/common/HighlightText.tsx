import { HTMLAttributes, ReactNode } from 'react';

interface HighlightTextProps extends HTMLAttributes<HTMLSpanElement> {
	margin?: string;
	color: string;
	bgColor: string;
	fontSize?: string;
	textAlign?: 'start' | 'center' | 'end';
	children: ReactNode;
}

const HighlightText = ({ margin = '0 0', color, bgColor, fontSize = '16px', textAlign = 'center', children }: HighlightTextProps) => {
	return (
		<span
			css={{
				display: 'inline-block',
				margin,
				padding: 'calc(var(--padding-md) * 0.2) calc(var(--padding-md) * 0.4)',
				backgroundColor: bgColor,
				color,
				fontSize,
				borderRadius: 'var(--radius)',
				fontWeight: 'var(--fw-semibold)',
				textAlign,
			}}>
			{children}
		</span>
	);
};

export default HighlightText;
