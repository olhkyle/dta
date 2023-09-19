import { WorkersQueryData } from '../queries/getWorkersQuery';
import { WorkerWithId } from '../service/workData';

/**
 * Awaited<ReturnType<typeof getWorkers>>
 * -> { workers: WorkersQueryData, totalLength: number }
 */

const edit = (oldData: WorkersQueryData, data: WorkerWithId) => ({
	...oldData,
	workers: oldData.workers.map(worker => (worker.id === data.id ? { ...worker, ...data } : worker)),
});

const remove = (oldData: WorkersQueryData, { id }: { id: string }) => ({
	...oldData,
	workers: oldData.workers.filter(worker => worker.id !== id),
});

export { edit, remove };
