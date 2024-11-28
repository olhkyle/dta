import { WorkersQueryData } from '../queries/workerQuery';
import { WorkerWithId } from '../service/workData';

/**
 * Awaited<ReturnType<typeof getWorkers>>
 * -> { workers: WorkersQueryData, totalLength: number }
 */

const edit = (data: WorkerWithId) => (oldData: WorkersQueryData) => ({
	...oldData,
	workers: oldData.workers.map(worker => (worker.id === data.id ? { ...worker, ...data } : worker)),
});

const remove =
	({ id }: { id: string }) =>
	(oldData: WorkersQueryData) => {
		return {
			...oldData,
			workers: oldData.workers.filter(worker => worker.id !== id),
		};
	};

export { edit, remove };
