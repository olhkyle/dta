import { QueryClient } from '@tanstack/react-query';
import getWorkersQuery from '../queries/getWorkersQuery';
import { workerQuery } from '../queries';

const getWorkersLoader = (queryClient: QueryClient) => async () => {
	const query = getWorkersQuery(workerQuery);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export default getWorkersLoader;
