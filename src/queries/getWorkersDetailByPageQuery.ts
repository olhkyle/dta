import { queryKey } from '../constants';
import { monthOfToday, yearOfToday } from '../constants/day';
import { ReturnTypeOfPaginationQuery } from '../service/utils';
import { getWorkersDetailByPage } from '../service/workData';
import { WorkerQuery } from './workerQuery';

const staleTime = 1000 * 2;

const getWorkersDetailByPageQuery = ({ inOrder = 'asc', year = yearOfToday, month = monthOfToday, workerName = '' }: WorkerQuery) => ({
	queryKey: [...queryKey.WORKERS_DETAIL_BY_PAGE, inOrder, `${year}-${month}`, workerName],
	queryFn: async ({ pageParam = 0 }) => {
		const data = await getWorkersDetailByPage({ inOrder, year, month, workerName, pageParam });
		return data;
	},
	getNextPageParam: (lastPage: { paginationData: ReturnTypeOfPaginationQuery }) => {
		return lastPage.paginationData.nextPage;
	},
	onError: (error: unknown) => console.error(error),
	staleTime,
});

export default getWorkersDetailByPageQuery;
