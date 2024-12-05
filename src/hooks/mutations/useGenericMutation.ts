import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastContent, toast } from 'react-toastify';

interface GenericMutationOptions<TData, TVariables, TContext> {
	queryKey: string[];
	mutationFn: (variables: TVariables) => Promise<TData>;
	onMutate: (variables: TVariables) => Promise<TContext | undefined> | TContext | undefined;
}

const useGenericMutation = <TData, TVariables, TContext>({
	queryKey,
	mutationFn,
	onMutate: expected,
}: GenericMutationOptions<TData, TVariables, TContext>) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onMutate: async variables => {
			await queryClient.cancelQueries({ queryKey });

			const prevWorkerData = queryClient.getQueryData(queryKey);

			if (prevWorkerData) {
				queryClient.setQueryData(queryKey, expected(variables));
			}

			return { prevWorkerData };
		},
		onError: (error, _, context) => {
			toast.error(error as unknown as ToastContent<unknown>);
			queryClient.setQueryData(queryKey, context?.prevWorkerData);
		},
		onSettled: () => {
			// Always refetch after error or success:
			queryClient.invalidateQueries({ queryKey });
		},
	});
};

export default useGenericMutation;
