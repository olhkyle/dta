import { monthOfToday, yearOfToday } from '../constants/day';
import { ReturnTypeOfPaginationQuery } from '../service/utils';
import { getWorkersDetailByPage } from '../service/workData';

import { WorkerQuery } from './workerQuery';

const staleTime = 3000;

const getWorkersDetailByPageQuery = ({ inOrder = 'desc', year = yearOfToday, month = monthOfToday, workerName = '' }: WorkerQuery) => ({
	queryKey: ['workersDetailByPage', inOrder, year, month, workerName],
	queryFn: async ({ pageParam = 0 }) => {
		const data = await getWorkersDetailByPage({ inOrder, year, month, workerName, pageParam });
		return data;
	},
	getNextPageParam: (lastPage: { paginationData: ReturnTypeOfPaginationQuery }) => {
		return lastPage.paginationData.nextPage;
	},
	staleTime,
});

export default getWorkersDetailByPageQuery;
