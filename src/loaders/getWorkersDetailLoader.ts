import { QueryClient } from '@tanstack/react-query';
import { getWorkersDetailQuery, workerQuery } from '../queries';

const getWorkersDetailLoader = (queryClient: QueryClient) => async () => {
	const query = getWorkersDetailQuery(workerQuery);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export default getWorkersDetailLoader;
