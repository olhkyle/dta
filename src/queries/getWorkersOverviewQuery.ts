import { getWorkersOverview } from '../service/workData';
import { monthOfToday, yearOfToday } from '../constants/day';
import { WorkerQuery } from './workerQuery';

const staleTime = 1000 * 2;

const getWorkersOverviewQuery = ({ inOrder = 'asc', year = yearOfToday, month = monthOfToday, workerName = '' }: WorkerQuery) => ({
	queryKey: ['workersOverview', inOrder, year, month, workerName],
	queryFn: async () => {
		const data = await getWorkersOverview({ inOrder, year, month, workerName });
		return data;
	},
	onError: (error: unknown) => console.error(error),
	staleTime,
});

export default getWorkersOverviewQuery;
