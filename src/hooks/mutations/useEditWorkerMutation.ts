import { useGenericMutation } from '.';
import { WorkerWithId, editWorker } from '../../service/workData';
import { edit } from '../../constants/mutateWorker';

const useEditWorkerMutation = (id: string) => {
	const queryKey = ['workersDetail', id];
	async (variables: WorkerWithId) => {
		await editWorker({ data: variables });
	};

	const { mutate } = useGenericMutation({
		queryKey,
		mutationFn: async (variables: WorkerWithId) => {
			await editWorker({ data: variables });
		},
		onMutate: edit,
	});

	return mutate;
};

export default useEditWorkerMutation;
