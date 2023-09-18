import { QueryClient } from '@tanstack/react-query';
import { monthOfToday, yearOfToday } from '../constants/day';
import { getWorkersDetailQuery } from '../queries';
import { WorkerQuery } from '../queries/getWorkersQuery';

const workerQuery: WorkerQuery = {
	inOrder: 'desc',
	year: yearOfToday,
	month: monthOfToday,
	workerName: '',
};

const getWorkersDetailLoader = (queryClient: QueryClient) => async () => {
	const query = getWorkersDetailQuery(workerQuery);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export default getWorkersDetailLoader;
