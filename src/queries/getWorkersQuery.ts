import { WorkerWithId, getWorkers } from '../service/workData';

interface QueryData {
	workers: WorkerWithId[];
	totalLength: number;
}

interface UniqueWorker extends WorkerWithId {
	sumOfPayment: number | undefined;
}

const getSumOfPayment = (data: QueryData, targetName: string) =>
	data?.workers
		.filter(({ workerName }) => workerName === targetName)
		.map(({ payment }) => +payment)
		.reduce((prev, curr) => prev + curr, 0);

const checkExist = (workers: WorkerWithId[], targetName: string) => workers.find(({ workerName }) => workerName === targetName);

const staleTime = 3000;

const getWorkersQuery = () => ({
	queryKey: ['workData'],
	queryFn: async () => {
		const data = await getWorkers();
		return data;
	},
	select: (data: QueryData) => ({
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
