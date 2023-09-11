import { addDoc, collection, getCountFromServer, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import { specifySnapshotIntoData } from './utils';
import { Worker } from '../components/register/RegisterForm';

export interface WorkerWithId extends Worker {
	id: string;
}

const COLLECTION_NAME = 'people';

const getWorkers = async () => {
	const collectionRef = collection(db, COLLECTION_NAME);
	const q = query(collectionRef, orderBy('workedDate', 'desc'));

	const dataSnapshot = await getDocs(q);

	const countSnapshot = await getCountFromServer(query(collectionRef));

	return {
		workers: specifySnapshotIntoData(dataSnapshot),
		totalLength: countSnapshot.data().count,
	};
};

const addWorker = async (worker: Worker) => {
	const workerRef = await addDoc(collection(db, COLLECTION_NAME), {
		...worker,
	});

	return workerRef.id;
};

export { getWorkers, addWorker };
