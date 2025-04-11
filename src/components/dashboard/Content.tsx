import { ReactNode } from 'react';
import { useMediaQuery } from '../../hooks';

interface ContentProps {
	children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
	const isMobile = useMediaQuery('(max-width: 640px)');

	return (
		<div
			css={{
				display: 'flex',
				alignItems: 'center',
				gap: '4px',
				fontSize: isMobile ? 'var(--fz-h4)' : 'var(--fz-h3)',
				fontWeight: 'var(--fw-bold)',
			}}>
			{children}
		</div>
	);
};

export default Content;
