import { HTMLAttributes } from 'react';

interface TextProps extends HTMLAttributes<HTMLDivElement> {
	typo?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
	color: string;
}

const TYPO_VARIANTS = {
	mega: {
		fontSize: '80px',
		lineHeight: '5.25rem',
		fontWeight: 900,
	},
	h1: {
		fontSize: '56px',
		lineHeight: '3.875rem',
		fontWeight: 900,
	},
	h2: {
		fontSize: '48px',
		lineHeight: '3rem',
		fontWeight: 800,
	},
	h3: {
		fontSize: '36px',
		lineHeight: '2.25rem',
		fontWeight: 700,
	},
	h4: {
		fontSize: '27px',
		lineHeight: '2.25rem',
		fontWeight: 700,
	},
	h5: {
		fontSize: '21px',
		lineHeight: '2rem',
		fontWeight: 700,
	},
	h6: {
		fontSize: '16px',
		lineHeight: '1.25rem',
		fontWeight: 600,
	},
	p: {
		fontSize: '15px',
		fontWeight: 400,
	},
};

const Text = ({ typo = 'p', color, ...props }: TextProps) => {
	return (
		<div
			css={{
				margin: '0',
				padding: '0',
				color,
				lineHeight: '1.6',
				...TYPO_VARIANTS[typo],
			}}
			{...props}
		/>
	);
};

export default Text;
