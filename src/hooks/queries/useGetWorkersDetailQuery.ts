import { useQuery } from '@tanstack/react-query';
import { getWorkersDetailQuery } from '../../queries';
import { WorkerQuery } from '../../queries/workerQuery';

const useGetWorkersDetailQuery = ({ inOrder, year, month, workerName }: WorkerQuery) => {
	return useQuery(getWorkersDetailQuery({ inOrder, year, month, workerName }));
};

export default useGetWorkersDetailQuery;
