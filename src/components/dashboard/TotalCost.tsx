import { Suspense } from 'react';
import styled from '@emotion/styled';
import { FaWonSign } from 'react-icons/fa';
import { Flex, Label, TotalCostSumOfPayment, TotalCostSumOfPaymentLoader } from '..';
import { WorkerQuery } from '../../queries';

interface TotalCostProps {
	year: WorkerQuery['year'];
}

const TotalCost = ({ year }: TotalCostProps) => {
	return (
		<Container direction={'column'} justifyContent={'space-between'} alignItems={'flex-start'} gap={'8px'} padding={'var(--padding-md)'}>
			<Label>
				<div>총 비용</div>
				<FaWonSign size="18" color="var(--color-gray-500)" />
			</Label>
			<Suspense fallback={<TotalCostSumOfPaymentLoader />}>
				<TotalCostSumOfPayment year={year} />
			</Suspense>
		</Container>
	);
};

const Container = styled(Flex)`
	border: 1px solid var(--outline-color);
	border-radius: var(--radius);
`;
export default TotalCost;
