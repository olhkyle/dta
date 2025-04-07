import { WorkerWithId } from '../service/workData';

/**
 * Awaited<ReturnType<typeof getWorkers>>
 * -> { workers: WorkersQueryData, totalLength: number }
 */

type OldData = {
	pageParams: number[];
	pages: { paginationData: { data: WorkerWithId[] }; totalPayment: number }[];
};

const edit = (data: WorkerWithId) => (oldData: OldData) => {
	return {
		...oldData,
		pages: oldData.pages.map(page => ({
			...page,
			paginationData: page.paginationData,
			data: page.paginationData.data.map(worker => (worker.id === data.id ? { ...worker, ...data } : worker)),
		})),
	};
};

const remove =
	({ id }: { id: string }) =>
	(oldData: OldData) => {
		return {
			...oldData,
			pages: oldData.pages.map(page => {
				const filteredData = page.paginationData.data.filter(worker => worker.id !== id);

				return {
					...page,
					paginationData: {
						...page.paginationData,
						data: filteredData,
					},
				};
			}),
		};
	};

export { edit, remove };
