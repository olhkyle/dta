import { useGenericMutation } from '.';
import { WorkerWithId, editWorker } from '../../service/workData';
import { edit } from '../../constants/mutateWorker';
import { queryKey as QUERY_KEY, SortOption } from '../../constants';

interface UseEditWorkerMutation {
	currentSort: SortOption;
	date: string;
	workerName: string;
}

const useEditWorkerMutation = ({ currentSort, date, workerName }: UseEditWorkerMutation) => {
	const queryKey = [...QUERY_KEY.WORKERS_DETAIL_BY_PAGE, currentSort, date, workerName];

	const { mutate, isLoading } = useGenericMutation({
		queryKey,
		mutationFn: async (variables: WorkerWithId) => {
			await editWorker({ data: variables });
		},
		onMutate: edit,
	});

	return { mutate, isLoading };
};

export default useEditWorkerMutation;
