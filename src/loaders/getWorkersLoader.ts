import { QueryClient } from '@tanstack/react-query';
import getWorkersQuery, { workerQuery } from '../queries/getWorkersQuery';
import { monthOfToday, yearOfToday } from '../constants/day';

const workerQuery: workerQuery = {
	inOrder: 'desc',
	year: yearOfToday,
	month: monthOfToday,
	workerName: '',
};

const getWorkersLoader = (queryClient: QueryClient) => async () => {
	const query = getWorkersQuery(workerQuery);

	console.log(queryClient.getQueryData(query.queryKey));
	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export default getWorkersLoader;
