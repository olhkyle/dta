import styled from '@emotion/styled';
import { FaWonSign } from 'react-icons/fa';
import { Flex, Label, TotalCostSumOfPayment } from '..';
import { WorkersOverviewDashboardData } from '../../service/workData';

interface TotalCostProps {
	data?: WorkersOverviewDashboardData;
}

const TotalCost = ({ data }: TotalCostProps) => {
	return (
		<Container direction={'column'} justifyContent={'space-between'} alignItems={'flex-start'} gap={'8px'} padding={'var(--padding-md)'}>
			<Label>
				<div>총 비용</div>
				<FaWonSign size="18" color="var(--color-gray-500)" />
			</Label>
			<TotalCostSumOfPayment data={data} />
		</Container>
	);
};

const Container = styled(Flex)`
	border: 1px solid var(--border-color);
	border-radius: var(--radius);
`;
export default TotalCost;
