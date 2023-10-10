import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastContent, toast } from 'react-toastify';
import { remove } from '../../constants/mutateWorker';
import { WorkersQueryData } from '../../queries/getWorkersQuery';
import { removeWorker } from '../../service/workData';

const useRemoveWorkerMutation = (id: string) => {
	const queryClient = useQueryClient();
	const queryKey = ['workers', id];

	const { mutate } = useMutation({
		mutationFn: async (variables: { id: string }) => {
			await removeWorker({ id: variables.id });
		},
		onMutate: async variables => {
			await queryClient.cancelQueries({ queryKey });

			const prevWorkerData = queryClient.getQueryData(queryKey);

			if (prevWorkerData) {
				queryClient.setQueryData(queryKey, oldData => remove(oldData as unknown as WorkersQueryData, variables));
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

export default useRemoveWorkerMutation;
