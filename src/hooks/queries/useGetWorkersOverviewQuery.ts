import { useQuery } from '@tanstack/react-query';
import { getWorkersOverviewQuery } from '../../queries';
import { WorkerQuery } from '../../queries/workerQuery';

const useGetWorkersOverviewQuery = ({ year, month, workerName }: WorkerQuery) => {
	const { data } = useQuery(getWorkersOverviewQuery({ year, month, workerName }));

	return data;
};

export default useGetWorkersOverviewQuery;
