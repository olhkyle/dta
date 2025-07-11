import Content from './Content';
import { WorkersOverviewDashboardData } from '../../service/workData';
import { useAppSelector } from '../../store/store';
import { getIsAdmin } from '../../store/userSlice';

interface WorkerTotalCountItemProps {
	data?: WorkersOverviewDashboardData;
}

const WorkerTotalCountItem = ({ data }: WorkerTotalCountItemProps) => {
	const isAdmin = useAppSelector(getIsAdmin);

	return (
		<Content>
			{isAdmin ? (
				<>
					<div>+ {data?.totalCount}</div>
					<span>명</span>
				</>
			) : (
				'Classified'
			)}
		</Content>
	);
};

export default WorkerTotalCountItem;
