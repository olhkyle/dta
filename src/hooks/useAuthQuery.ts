import { User } from 'firebase/auth';
import { auth } from '../service/firebase';
import { useQuery } from '@tanstack/react-query';
import useSetUser from './useSetUser';
import { getSignedUserData } from '../service/auth';

const useAuthQuery = () => {
	const { setCurrentUser, setLogoutUser } = useSetUser();

	const { data, isFetched, isLoading, error, refetch } = useQuery<User | null, Error>({
		queryKey: ['auth'],
		queryFn: async () => {
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
				// 언마운트 시 구독 해제를 위한 클린업 함수 반환
				return unsubscribe;
			});
		},
		staleTime: 1000, // 인증 상태는 자주 변경되지 않으므로
		gcTime: 1000 * 2,
		enabled: true, // 초기 로드 시 자동 실행
	});

	return { data, isFetched, isLoading, error, refetch };
};

export default useAuthQuery;
