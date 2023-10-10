import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/store';
import { UserState, logoutUser, setUser } from '../store/userSlice';

const useSetUser = () => {
	const dispatch = useAppDispatch();
	const setCurrentUser = (userData: UserState) => dispatch(setUser(userData));
	const setLogoutUser = () => dispatch(logoutUser());

	const userData = useSelector(({ user }) => user);

	return { ...userData, setCurrentUser, setLogoutUser };
};

export default useSetUser;
