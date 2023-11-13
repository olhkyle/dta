import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { CiSquareMinus } from 'react-icons/ci';

interface BadgeProps {
	label: string;
	bgColor: string;
	unit?: string;
	children: ReactNode;
}

const Badge = ({ label, bgColor, unit = '원', children }: BadgeProps) => {
	return (
		<Container css={{ display: 'flex', alignItems: 'center' }}>
			<span css={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '17px', fontWeight: '600' }}>
				{label}
				<CiSquareMinus size="20" />
			</span>
			<span
				css={{
					marginLeft: '0.4rem',
					padding: '0.3rem 0.6rem',
					borderRadius: 'var(--radius)',
					backgroundColor: bgColor,
					fontSize: '17px',
					fontWeight: '700',
					color: 'var(--bg-color)',
				}}>
				{children}
			</span>
			<span css={{ paddingLeft: '0.2rem', fontSize: '17px', fontWeight: '600', color: 'var(--text-color)' }}>{unit}</span>
		</Container>
	);
};

const Container = styled.span`
	span {
		@media screen and (min-width: 640px) {
			font-size: 19px;
		}

		@media screen and (min-width: 750px) {
			font-size: 21px;
		}
	}
`;

export default Badge;
