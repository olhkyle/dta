import { QueryClient } from '@tanstack/react-query';
import getWorkersQuery from '../queries/getWorkersQuery';

const getWorkersLoader = (queryClient: QueryClient) => async () => {
	const query = getWorkersQuery();

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export default getWorkersLoader;
