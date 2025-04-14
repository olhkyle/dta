import Content from './Content';
import { WorkersOverviewDashboardData } from '../../service/workData';

interface WorkerTotalCountItemProps {
	data?: WorkersOverviewDashboardData;
}

const WorkerTotalCountItem = ({ data }: WorkerTotalCountItemProps) => {
	return (
		<Content>
			<div>+ {data?.totalCount}</div>
			<span>명</span>
		</Content>
	);
};

export default WorkerTotalCountItem;
