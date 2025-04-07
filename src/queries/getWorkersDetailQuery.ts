import { queryKey } from '../constants';
import { monthOfToday, yearOfToday } from '../constants/day';
import { getWorkersDetail } from '../service/workData';
import { WorkerQuery } from './workerQuery';

const staleTime = 1000 * 2;

const getWorkersDetailQuery = ({ inOrder = 'asc', year = yearOfToday, month = monthOfToday, workerName = '' }: WorkerQuery) => ({
	queryKey: [...queryKey.WORKERS_DETAIL, inOrder, `${year}-${month}`, workerName],
	queryFn: async () => {
		const data = await getWorkersDetail({ inOrder, year, month, workerName });
		return data;
	},
	onError: (error: unknown) => console.error(error),
	staleTime,
});

export default getWorkersDetailQuery;
