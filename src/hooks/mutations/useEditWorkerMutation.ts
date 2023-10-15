import { useGenericMutation } from '.';
import { edit } from '../../constants/mutateWorker';
import { WorkerWithId, editWorker } from '../../service/workData';

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
