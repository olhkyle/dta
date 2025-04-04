import { ReactNode } from 'react';

interface HighlightTextProps {
	color: string;
	bgColor: string;
	fontSize?: string;
	children: ReactNode;
}

const HighlightText = ({ color, bgColor, fontSize = '16px', children }: HighlightTextProps) => {
	return (
		<span
			css={{
				padding: 'calc(var(--padding-md) * 0.2) calc(var(--padding-md) * 0.4)',
				backgroundColor: bgColor,
				color,
				fontSize,
				borderRadius: 'var(--radius)',
				fontWeight: 'var(--fw-semibold)',
				textAlign: 'center',
			}}>
			{children}
		</span>
	);
};

export default HighlightText;
