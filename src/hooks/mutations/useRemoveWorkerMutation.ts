import { useGenericMutation } from '.';
import { removeWorker } from '../../service/workData';
import { remove } from '../../constants/mutateWorker';
import { queryKey as QUERY_KEY, SortOption } from '../../constants';

interface UseRemoveWorkerMutation {
	currentSort: SortOption;
	date: string;
	workerName: string;
}

const useRemoveWorkerMutation = ({ currentSort, date, workerName }: UseRemoveWorkerMutation) => {
	const queryKey = [...QUERY_KEY.WORKERS_DETAIL_BY_PAGE, currentSort, date, workerName];

	const { mutate, isLoading } = useGenericMutation({
		queryKey,
		mutationFn: async (variables: { id: string }) => {
			await removeWorker({ id: variables.id });
		},
		onMutate: remove,
	});

	return { mutate, isLoading };
};

export default useRemoveWorkerMutation;
