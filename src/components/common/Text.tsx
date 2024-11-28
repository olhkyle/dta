import { HTMLAttributes } from 'react';

interface TextProps extends HTMLAttributes<HTMLDivElement> {
	typo?: 'mega' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'p' | 'sm' | 'xs';
	color: string;
}

const TYPO_VARIANTS = {
	mega: {
		fontSize: 'var(--fz-2xl)',
		lineHeight: '5.25rem',
		fontWeight: 'var(--fw-black)',
	},
	h1: {
		fontSize: 'var(--fz-h1)',
		lineHeight: '3.875rem',
		fontWeight: 'var(--fw-black)',
	},
	h2: {
		fontSize: 'var(--fz-h2)',
		lineHeight: '3rem',
		fontWeight: 'var(--fw-bold)',
	},
	h3: {
		fontSize: 'var(--fz-h3)',
		lineHeight: '2.25rem',
		fontWeight: 'var(--fw-bold)',
	},
	h4: {
		fontSize: 'var(--fz-h4)',
		lineHeight: '2.25rem',
		fontWeight: 'var(--fw-bold)',
	},
	h5: {
		fontSize: 'var(--fz-h5)',
		lineHeight: '2rem',
		fontWeight: 'var(--fw-bold)',
	},
	h6: {
		fontSize: 'var(--fz-h6)',
		lineHeight: '1.25rem',
		fontWeight: 'var(--fw-semibold)',
	},
	h7: {
		fontSize: 'var(--fz-h7)',
		lineHeight: '1.25rem',
		fontWeight: 'var(--fw-medium)',
	},
	p: {
		fontSize: 'var(-fz-p)',
		fontWeight: 'var(--fw-regular)',
	},
	sm: {
		fontSize: 'var(--fz-sm)',
		fontWeight: 'var(--fw-regular)',
	},
	xs: {
		fontSize: 'var(--fz-xs)',
		fontWeight: 'var(--fw-regular)',
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
