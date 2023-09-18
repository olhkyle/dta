import {
	CollectionReference,
	DocumentData,
	addDoc,
	and,
	collection,
	getCountFromServer,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { db } from './firebase';
import { specifySnapshotIntoData } from './utils';
import { Worker } from '../components/register/RegisterForm';
import { InOrder, WorkerQuery } from '../queries/getWorkersQuery';

export interface WorkerWithId extends Worker {
	id: string;
}

const COLLECTION_NAME = 'people';

const customizeQuery = (collectionRef: CollectionReference<DocumentData, DocumentData>, searchCondition: any, inOrder: InOrder) =>
	query(collectionRef, searchCondition, orderBy('workedDate', inOrder));

const getWorkers = async ({ inOrder, year, month, workerName }: WorkerQuery) => {
	const collectionRef = collection(db, COLLECTION_NAME);

	const q = (month: number) =>
		query(
			collectionRef,
			and(
				where('workedDate', '<', month === 12 ? new Date(`${year + 1}-${month - 11}`) : new Date(`${year}-${month + 1}`)),
				where('workedDate', '>=', new Date(`${year}-${month}`)),
			),
			orderBy('workedDate', inOrder),
		);

	const dataSnapshot = await getDocs(q(month));

	const countSnapshot = await getCountFromServer(query(collectionRef));

	const workers =
		workerName !== ''
			? specifySnapshotIntoData(dataSnapshot).filter(data => new RegExp(workerName, 'g').test(data.workerName))
			: specifySnapshotIntoData(dataSnapshot);

	return {
		workers,
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
