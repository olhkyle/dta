import { User } from 'firebase/auth';
import { auth } from '../service/firebase';
import { useQuery } from '@tanstack/react-query';
import useSetUser from './useSetUser';
import { getSignedUserData } from '../service/auth';
import { queryKey } from '../constants';

const useAuthQuery = () => {
	const { setCurrentUser, setLogoutUser } = useSetUser();

	const { data, isFetched, isLoading, error, refetch } = useQuery<User | null, Error>({
		queryKey: queryKey.AUTH,
		queryFn: async (): Promise<User | null> => {
			return new Promise<User | null>((resolve, reject) => {
				const unsubscribe = auth.onAuthStateChanged(
					async user => {
						unsubscribe();

						if (!user) {
							setLogoutUser();
							resolve(null);
							return;
						}

						try {
							const signedUserData = await getSignedUserData(user.email!);

							const userData = {
								...user,
								name: user.displayName ?? '',
								nickname: signedUserData?.nickname,
								isAdmin: signedUserData?.isAdmin,
							};

							setCurrentUser(userData);

							resolve(userData);
						} catch (error) {
							reject(error);
							setLogoutUser();
						}
					},
					error => {
						unsubscribe();
						reject(error);
						setLogoutUser();
					},
				);
				return unsubscribe;
			});
		},
		staleTime: 1000,
		cacheTime: 2000,
		enabled: true,
	});

	return { data, isFetched, isLoading, error, refetch };
};

export default useAuthQuery;
