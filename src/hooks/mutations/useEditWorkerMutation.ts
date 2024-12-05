import { useGenericMutation } from '.';
import { WorkerWithId, editWorker } from '../../service/workData';
import { edit } from '../../constants/mutateWorker';

const useEditWorkerMutation = (id: string) => {
	const queryKey = ['workersDetail', id];

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
