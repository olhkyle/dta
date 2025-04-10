import { ReactNode } from 'react';

interface LabelProps {
	children: ReactNode;
}

const Label = ({ children }: LabelProps) => {
	return (
		<div
			css={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '100%',
				fontSize: 'var(--fz-h7)',
				fontWeight: 'var(--fw-semibold)',
			}}>
			{children}
		</div>
	);
};

export default Label;
