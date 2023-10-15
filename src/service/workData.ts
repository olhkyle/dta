import { addDoc, and, collection, deleteDoc, doc, getCountFromServer, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from './firebase';
import { paginationQuery, specifySnapshotIntoData } from './utils';
import { Worker } from '../components/register/RegisterForm';
import { WorkerQuery, WorkersPaginationQuery } from '../queries/workerQuery';

export interface WorkerWithId extends Worker {
	id: string;
}

const COLLECTION_NAME = 'people';
const LIMIT_SIZE_PER_PAGE = 20;

const getWorkersDetailByPage = async ({ inOrder, year, month, workerName, pageParam }: WorkersPaginationQuery) => {
	const collectionRef = collection(db, COLLECTION_NAME);

	const searchConditionByMonth = (month: number) =>
		and(
			where('workedDate', '<', month === 12 ? new Date(`${year + 1}-${month - 11}`) : new Date(`${year}-${month + 1}`)),
			where('workedDate', '>=', new Date(`${year}-${month}`)),
		);

	const orderCondition = orderBy('workedDate', inOrder);

	const q = query(collectionRef, searchConditionByMonth(month), orderCondition);

	const [paginationData, dataSnapshot] = await Promise.all([
		paginationQuery({
			collectionRef,
			pageParam,
			searchCondition: searchConditionByMonth(month),
			orderCondition,
			limitSizePerPage: LIMIT_SIZE_PER_PAGE,
		}),
		getDocs(q),
	]);

	const filteredData = {
		...paginationData,
		data: paginationData.data.filter(worker => new RegExp(workerName, 'g').test(worker.workerName)),
	};

	return {
		paginationData: filteredData,
		totalPayment: specifySnapshotIntoData(dataSnapshot).reduce((acc, curr) => (acc += +curr.payment), 0),
	};
};

const getWorkers = async ({ inOrder, year, month, workerName }: WorkerQuery) => {
	const collectionRef = collection(db, COLLECTION_NAME);

	const qByMonth = (month: number) =>
		query(
			collectionRef,
			and(
				where('workedDate', '<', month === 12 ? new Date(`${year + 1}-${month - 11}`) : new Date(`${year}-${month + 1}`)),
				where('workedDate', '>=', new Date(`${year}-${month}`)),
			),
			orderBy('workedDate', inOrder),
		);

	const [dataSnapshot, countSnapshot] = await Promise.all([getDocs(qByMonth(month)), getCountFromServer(query(collectionRef))]);

	const workers =
		workerName !== ''
			? specifySnapshotIntoData(dataSnapshot).filter(data => new RegExp(workerName, 'g').test(data.workerName))
			: specifySnapshotIntoData(dataSnapshot);

	return {
		workers,
		totalLength: countSnapshot.data().count,
	};
};

const getSpecificWorker = async ({ workerName }: { workerName: string }) => {
	const collectionRef = collection(db, COLLECTION_NAME);
	const q = query(collectionRef, where('workerName', '==', workerName));
	const dataSnapshot = await getDocs(q);

	return specifySnapshotIntoData(dataSnapshot)[0];
};

const addWorker = async (worker: Worker) => {
	const workerRef = await addDoc(collection(db, COLLECTION_NAME), {
		...worker,
	});

	return workerRef.id;
};

const editWorker = async ({ data }: { data: WorkerWithId }) => {
	const { id, ...worker } = data;
	await updateDoc(doc(db, COLLECTION_NAME, id), { ...worker });
};

const removeWorker = async ({ id }: { id: string }) => {
	await deleteDoc(doc(db, COLLECTION_NAME, id));
};

export { getWorkersDetailByPage, getWorkers, getSpecificWorker, addWorker, editWorker, removeWorker };
