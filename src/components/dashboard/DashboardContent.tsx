import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { Flex, TotalCost, WorkerExpenseChart, WorkerList, WorkerTotalCount, WorkSpace } from '..';
import { queryKey } from '../../constants';
import { WorkerQuery } from '../../queries';
import { getWorkersOverviewByYear } from '../../service/workData';

interface DashboardContentProps {
	year: WorkerQuery['year'];
}

const DashboardContent = ({ year }: DashboardContentProps) => {
	const { data } = useQuery({
		queryKey: [...queryKey.WORKERS_OVERVIEW_DASHBOARD, year],
		queryFn: () => getWorkersOverviewByYear({ year }),
	});

	return (
		<Flex direction={'column'} justifyContent={'space-between'} gap={'16px'} margin={'16px auto'} width={'100%'}>
			<Overview>
				<TotalCost data={data} />
				<WorkerTotalCount data={data} />
				<WorkSpace data={data} />
			</Overview>
			<ChartAndList>
				<WorkerExpenseChart data={data} />
				<WorkerList data={data} year={year} />
			</ChartAndList>
		</Flex>
	);
};

const Overview = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;

	width: 100%;

	@media screen and (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const ChartAndList = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;

	width: 100%;

	@media screen and (min-width: 960px) {
		grid-template-columns: 2fr 1fr;
	}
`;

export default DashboardContent;
