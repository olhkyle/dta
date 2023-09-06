import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

interface SignIn {
	email: string;
	password: string;
}

const COLLECTION = 'user';

const signIn = async ({ email, password }: SignIn) => {
	await signInWithEmailAndPassword(auth, email, password);

	const userDocRef = doc(db, COLLECTION, email);
	const userSnapShot = await getDoc(userDocRef);

	const userData = userSnapShot.data();

	if (userData) {
		const { lastName, firstName } = userData;
		return { name: lastName + firstName, email } as const;
	}
};

const logOut = async () => {
	await signOut(auth);
};

export { signIn, logOut };
