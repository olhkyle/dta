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
				padding: '0.2rem 0.4rem',
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
