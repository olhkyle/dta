import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Flex from './Flex';

interface EmptyIndicatorProps {
	decoration: ReactNode;
	label: string;
}

const EmptyIndicator = ({ decoration, label }: EmptyIndicatorProps) => {
	return (
		<Container
			direction={'column'}
			justifyContent={'center'}
			alignItems={'center'}
			gap={'var(--padding-sm)'}
			padding={'calc(var(--padding-md) * 4) calc(var(--padding-md) * 2)'}
			width={'100%'}>
			<Decoration>{decoration}</Decoration>
			<Label>{label}</Label>
		</Container>
	);
};

const Container = styled(Flex)`
	margin: 32px auto;
	min-height: 360px;
	font-size: var(--fz-rp);
	font-weight: var(--fw-semibold);
	text-align: center;
	border-radius: var(--radius);
	outline: 1px solid var(--color-gray-200);

	@media screen and (min-width: 640px) {
		margin: 32px auto 80px;
		font-size: var(--fz-h6);
	}
`;

const Decoration = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 60px;
	font-size: 48px;
`;

const Label = styled.p`
	margin-top: 16px;
	font-size: var(--fz-p);
	color: var(--color-gray-500);
`;

export default EmptyIndicator;
