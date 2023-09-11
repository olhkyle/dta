import { ReactNode } from 'react';
import { CiSquareMinus } from 'react-icons/ci';

interface BadgeProps {
	label: string;
	bgColor: string;
	children: ReactNode;
}

const Badge = ({ label, bgColor, children }: BadgeProps) => {
	return (
		<div css={{ display: 'flex', alignItems: 'center' }}>
			<span css={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '21px', fontWeight: '600' }}>
				{label}
				<CiSquareMinus size="22" />
			</span>
			<div
				css={{
					marginLeft: '0.4rem',
					padding: '0.3rem 0.6rem',
					borderRadius: 'var(--radius)',
					backgroundColor: bgColor,
					fontSize: '21px',
					fontWeight: '700',
					color: 'var(--bg-color)',
				}}>
				{children}
			</div>
		</div>
	);
};

export default Badge;
