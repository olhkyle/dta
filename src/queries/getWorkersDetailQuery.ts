import { monthOfToday, yearOfToday } from '../constants/day';
import { WorkerWithId, getWorkers } from '../service/workData';
import { WorkerQuery, WorkersQueryData } from './getWorkersQuery';

const staleTime = 3000;

export const sortByNameAndWorkedDate = (workers: WorkerWithId[]) =>
	Object.values(
		workers.reduce((acc, worker) => {
			const { workerName } = worker;
			if (!acc[workerName]) {
				acc[workerName] = [];
			}

			acc[workerName].push(worker);
			return acc;
		}, {} as { [key: string]: WorkerWithId[] }),
	)
		.flatMap((groupedWorkers, pos) =>
			groupedWorkers
				.sort((prev, curr) => prev.workedDate - curr.workedDate)
				.map((worker, idx) => ({ ...worker, position: pos, isFirstIdxOfArr: idx === 0 })),
		)
		.sort((prev, curr) => prev.workerName.toLowerCase().localeCompare(curr.workerName.toLowerCase()) && prev.position - curr.position);

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
