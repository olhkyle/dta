import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

interface SignIn {
	email: string;
	password: string;
}

const COLLECTION_NAME = 'user';

const signIn = async ({ email, password }: SignIn) => {
	await signInWithEmailAndPassword(auth, email, password);

	const userDocRef = doc(db, COLLECTION_NAME, email);
	const userSnapShot = await getDoc(userDocRef);

	const userData = userSnapShot.data();

	if (userData) {
		const { lastName, firstName, isAdmin } = userData;
		return { name: lastName + firstName, email, isAdmin } as const;
	}
};

const logOut = async () => {
	await signOut(auth);
};

export { signIn, logOut };
