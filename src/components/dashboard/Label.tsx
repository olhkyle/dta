import { ReactNode } from 'react';
import { useMediaQuery } from '../../hooks';

interface LabelProps {
	children: ReactNode;
}

const Label = ({ children }: LabelProps) => {
	const isMobile = useMediaQuery('(max-width: 640px)');

	return (
		<div
			css={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '100%',
				fontSize: isMobile ? 'var(--fz-md)' : 'var(--fz-h7)',
				fontWeight: 'var(--fw-semibold)',
			}}>
			{children}
		</div>
	);
};

export default Label;
