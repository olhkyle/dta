import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastContent, toast } from 'react-toastify';
import { edit } from '../../constants/mutateWorker';
import { WorkersQueryData } from '../../queries/getWorkersQuery';
import { WorkerWithId, editWorker } from '../../service/workData';

const useEditWorkerMutation = (id: string) => {
	const queryClient = useQueryClient();
	const queryKey = ['workers', id];

	const { mutate } = useMutation({
		mutationFn: async (variables: WorkerWithId) => {
			await editWorker({ data: variables });
		},
		onMutate: async variables => {
			await queryClient.cancelQueries({ queryKey });

			const prevWorkerData = queryClient.getQueryData(queryKey);

			if (prevWorkerData) {
				queryClient.setQueryData(queryKey, oldData => edit(oldData as unknown as WorkersQueryData, variables));
			}
			return { prevWorkerData };
		},
		onError: (error, _, context) => {
			toast.error(error as unknown as ToastContent<unknown>);
			queryClient.setQueryData(queryKey, context?.prevWorkerData);
		},
		// onSettled: () => {
		// 	queryClient.invalidateQueries({ queryKey });
		// },
	});

	return mutate;
};

export default useEditWorkerMutation;
