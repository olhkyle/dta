import { QueryClient } from '@tanstack/react-query';
import { getWorkersOverviewQuery } from '../queries';
import { workerQuery } from '../queries/workerQuery';

const getWorkersOverviewLoader = (queryClient: QueryClient) => async () => {
	const query = getWorkersOverviewQuery(workerQuery);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export default getWorkersOverviewLoader;
