import { ReactNode } from 'react';

interface ContentProps {
	children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
	return (
		<div
			css={{
				display: 'flex',
				alignItems: 'center',
				gap: '4px',
				fontSize: 'var(--fz-h4)',
				fontWeight: 'var(--fw-bold)',
			}}>
			{children}
		</div>
	);
};

export default Content;
