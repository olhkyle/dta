import { useGenericMutation } from '.';
import { removeWorker } from '../../service/workData';
import { remove } from '../../constants/mutateWorker';

const useRemoveWorkerMutation = (id: string) => {
	const queryKey = ['workersDetail', id];

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
