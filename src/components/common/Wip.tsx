import { ReactNode } from 'react';

interface WipProps {
	bgColor: string;
	children: ReactNode;
}

const Wip = ({ bgColor, children }: WipProps) => {
	return (
		<div
			css={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '2rem',
				backgroundColor: bgColor,
				color: 'var(--bg-color)',
				borderRadius: '9999px',
			}}>
			{children}
		</div>
	);
};

export default Wip;
