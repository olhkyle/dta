import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

interface SignIn {
	email: string;
	password: string;
}

const COLLECTION_NAME = 'user';

const getSignedUserData = async (email: string) => {
	const userDocRef = doc(db, COLLECTION_NAME, email);
	const userSnapShot = await getDoc(userDocRef);

	const userData = userSnapShot.data() as { lastName: string; firstName: string; isAdmin: boolean };

	return { nickname: userData?.lastName + userData?.firstName, email, isAdmin: userData?.isAdmin };
};

const signIn = async ({ email, password }: SignIn) => {
	const { user } = await signInWithEmailAndPassword(auth, email, password);
	const data = await getSignedUserData(email);

	return { ...data, name: user?.displayName ?? data.nickname };
};

const logOut = async () => {
	await signOut(auth);
};

export { getSignedUserData, signIn, logOut };
