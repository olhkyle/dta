import { WorkerWithId, getWorkers } from '../service/workData';
import { monthOfToday, yearOfToday } from '../constants/day';
import { ControlValues } from '../constants/sortControls';

export interface WorkersQueryData {
	workers: WorkerWithId[];
	totalLength: number;
}

export interface WorkerQuery {
	inOrder: ControlValues;
	year: number;
	month: number;
	workerName: string;
}

interface UniqueWorker extends WorkerWithId {
	sumOfPayment: number | undefined;
}

const getSumOfPayment = (data: WorkersQueryData, targetName: string) =>
	data?.workers
		.filter(({ workerName }) => workerName === targetName)
		.map(({ payment }) => +payment)
		.reduce((prev, curr) => prev + curr, 0);

const checkExist = (workers: WorkerWithId[], targetName: string) => workers.find(({ workerName }) => workerName === targetName);

const staleTime = 3000;

const getWorkersQuery = ({ inOrder = 'desc', year = yearOfToday, month = monthOfToday, workerName = '' }: WorkerQuery) => ({
	queryKey: ['workers', inOrder, year, month, workerName],
	queryFn: async () => {
		const data = await getWorkers({ inOrder, year, month, workerName });
		return data;
	},
	select: (data: WorkersQueryData) => ({
		workers: data?.workers.reduce((uniqueWorkers, worker) => {
			if (!checkExist(uniqueWorkers, worker.workerName)) {
				uniqueWorkers.push({ ...worker, sumOfPayment: getSumOfPayment(data, worker.workerName) });
			}
			return uniqueWorkers;
		}, [] as UniqueWorker[]),
		sumOfPayment: data?.workers.reduce((acc, worker) => (acc += +worker.payment), 0),
	}),
	staleTime,
});

export default getWorkersQuery;
