import Content from './Content';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants';
import { WorkerQuery } from '../../queries';
import { getWorkersOverviewByYear } from '../../service/workData';

interface WorkerTotalCountItemProps {
	year: WorkerQuery['year'];
}

const WorkerTotalCountItem = ({ year }: WorkerTotalCountItemProps) => {
	const { data } = useQuery({
		queryKey: [...queryKey.WORKERS_OVERVIEW_DASHBOARD, year],
		queryFn: () => getWorkersOverviewByYear({ year }),
	});

	return (
		<Content>
			<div>+ {data?.totalCount}</div>
			<span>명</span>
		</Content>
	);
};

export default WorkerTotalCountItem;
