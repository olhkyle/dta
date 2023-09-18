import { QueryClient } from '@tanstack/react-query';
import getWorkersQuery, { WorkerQuery } from '../queries/getWorkersQuery';
import { monthOfToday, yearOfToday } from '../constants/day';

const workerQuery: WorkerQuery = {
	inOrder: 'desc',
	year: yearOfToday,
	month: monthOfToday,
	workerName: '',
};

const getWorkersLoader = (queryClient: QueryClient) => async () => {
	const query = getWorkersQuery(workerQuery);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export default getWorkersLoader;
