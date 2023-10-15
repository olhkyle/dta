import { useGenericMutation } from '.';
import { remove } from '../../constants/mutateWorker';
import { removeWorker } from '../../service/workData';

const useRemoveWorkerMutation = (id: string) => {
	const queryKey = ['workersDetail', id];

	const { mutate } = useGenericMutation({
		queryKey,
		mutationFn: async (variables: { id: string }) => {
			await removeWorker({ id: variables.id });
		},
		onMutate: remove,
	});

	return mutate;
};

export default useRemoveWorkerMutation;
