import { monthOfToday, yearOfToday } from '../constants/day';
import { getWorkers } from '../service/workData';
import { WorkerQuery, WorkersQueryData, sortByNameAndWorkedDate } from './workerQuery';

const staleTime = 3000;

const getWorkersDetailQuery = ({ inOrder = 'desc', year = yearOfToday, month = monthOfToday, workerName = '' }: WorkerQuery) => ({
	queryKey: ['workersDetail', inOrder, year, month, workerName],
	queryFn: async () => {
		const data = await getWorkers({ inOrder, year, month, workerName });
		return data;
	},
	select: (data: WorkersQueryData) => ({
		workers: sortByNameAndWorkedDate(data?.workers),
		totalLength: data?.totalLength,
		sumOfPayment: data?.workers.reduce((acc, worker) => (acc += +worker.payment), 0),
	}),
	staleTime,
});

export default getWorkersDetailQuery;
