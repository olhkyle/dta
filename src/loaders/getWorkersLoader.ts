import { QueryClient } from '@tanstack/react-query';
import { getWorkersQuery } from '../queries';
import { workerQuery } from '../queries/workerQuery';

const getWorkersLoader = (queryClient: QueryClient) => async () => {
	const query = getWorkersQuery(workerQuery);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export default getWorkersLoader;
