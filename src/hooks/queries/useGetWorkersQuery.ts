import { useQuery } from '@tanstack/react-query';
import { getWorkersQuery } from '../../queries';
import { WorkerQuery } from '../../queries/workerQuery';

const useGetWorkersQuery = ({ inOrder, year, month, workerName }: WorkerQuery) => {
	const { data } = useQuery(getWorkersQuery({ inOrder, year, month, workerName }));

	return data;
};

export default useGetWorkersQuery;
