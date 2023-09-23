import { ReactNode } from 'react';

interface HighlightTextProps {
	color: string;
	bgColor: string;
	children: ReactNode;
}

const HighlightText = ({ color, bgColor, children }: HighlightTextProps) => {
	return (
		<span
			css={{
				padding: '0.2rem 0.4rem',
				backgroundColor: bgColor,
				color,
				borderRadius: '8px',
				fontWeight: '600',
				textAlign: 'center',
			}}>
			{children}
		</span>
	);
};

export default HighlightText;
