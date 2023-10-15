import { useInfiniteQuery } from '@tanstack/react-query';
import { getWorkersDetailByPageQuery } from '../../queries';
import { WorkerQuery } from '../../queries/workerQuery';

const useGetWorkersDetailInfiniteQuery = ({ inOrder, year, month, workerName }: WorkerQuery) => {
	return useInfiniteQuery(getWorkersDetailByPageQuery({ inOrder, year, month, workerName }));
};

export default useGetWorkersDetailInfiniteQuery;
