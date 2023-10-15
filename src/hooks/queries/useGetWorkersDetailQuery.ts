import { useQuery } from '@tanstack/react-query';
import { getWorkersDetailQuery } from '../../queries';
import { WorkerQuery } from '../../queries/workerQuery';

const useGetWorkersDetailQuery = ({ inOrder, year, month, workerName }: WorkerQuery) => {
	const { data, refetch } = useQuery(getWorkersDetailQuery({ inOrder, year, month, workerName }));

	return { data, refetch };
};

export default useGetWorkersDetailQuery;
