import { collection, query, where, doc, and, orderBy, getCountFromServer, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { paginationQuery, specifySnapshotIntoData } from './utils';
import { Worker } from '../components/register/RegisterForm';
import { WorkerQuery, WorkersPaginationQuery, WorkersQueryData } from '../queries/workerQuery';

export interface WorkerWithId extends Worker {
	id: string;
}

interface UniqueWorker extends WorkerWithId {
	sumOfPayment: number | undefined;
}

type WorkersDetailBySort = ReturnType<typeof sortByNameAndWorkedDate>;

const COLLECTION_NAME = 'people';
const LIMIT_SIZE_PER_PAGE = 20;

const addSumOfPaymentForEachWorker = (data: WorkersQueryData, inOrder = 'asc') =>
	data.workers
		.reduce((uniqueWorkers, worker) => {
			if (!checkExist(uniqueWorkers, worker.workerName)) {
				uniqueWorkers.push({ ...worker, sumOfPayment: getSumOfPayment(data, worker.workerName) });
			}
			return uniqueWorkers;
		}, [] as UniqueWorker[])
		.sort((prev, curr) => (inOrder === 'asc' ? prev.createdAt - curr.createdAt : curr.createdAt - prev.createdAt));

const getSumOfPayment = (data: WorkersQueryData, targetName: string) =>
	data?.workers
		.filter(({ workerName }) => workerName === targetName)
		.map(({ payment }) => +payment)
		.reduce((prev, curr) => prev + curr, 0);

const checkExist = (workers: WorkerWithId[], targetName: string) => workers.find(({ workerName }) => workerName === targetName);

const sortByNameAndWorkedDate = (workers: WorkerWithId[], inOrder = 'asc') => {
	const workersSortedByCreatedAt = workers.sort((prev, curr) =>
		inOrder === 'asc' ? prev.createdAt - curr.createdAt : curr.createdAt - prev.createdAt,
	);

	return Object.values(
		workersSortedByCreatedAt.reduce((acc, worker) => {
			const { workerName } = worker;
			if (!acc[workerName]) {
				acc[workerName] = [];
			}

			acc[workerName].push(worker);
			return acc;
		}, {} as { [key: string]: WorkerWithId[] }),
	).flatMap((groupedWorkers, pos) =>
		groupedWorkers
			.sort((prev, curr) => (inOrder === 'asc' ? prev.workedDate - curr.workedDate : curr.workedDate - prev.workedDate))
			.map((worker, idx) => ({ ...worker, position: pos, isFirstIdxOfArr: idx === 0 })),
	);
};

const getWorkersDetailByPage = async ({ inOrder, year, month, workerName, pageParam }: WorkersPaginationQuery) => {
	const collectionRef = collection(db, COLLECTION_NAME);

	const searchConditionByMonth = (month: number) =>
		and(
			where('workedDate', '<', month === 12 ? new Date(`${year + 1}-${month - 11}`) : new Date(`${year}-${month + 1}`)),
			where('workedDate', '>=', new Date(`${year}-${month}`)),
		);

	const orderCondition = orderBy('workedDate', inOrder);
	const createdAtCondition = orderBy('createdAt', inOrder);

	const q = query(collectionRef, searchConditionByMonth(month), orderCondition, createdAtCondition);

	const [paginationData, dataSnapshot] = await Promise.all([
		paginationQuery({
			collectionRef,
			pageParam,
			searchCondition: searchConditionByMonth(month),
			orderCondition,
			createdAtCondition,
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

	const queryByMonth = (month: number) =>
		query(
			collectionRef,
			and(
				where('workedDate', '<', month === 12 ? new Date(`${year + 1}-${month - 11}`) : new Date(`${year}-${month + 1}`)),
				where('workedDate', '>=', new Date(`${year}-${month}`)),
			),
			orderBy('workedDate', inOrder),
		);

	const [dataSnapshot, countSnapshot] = await Promise.all([getDocs(queryByMonth(month)), getCountFromServer(query(collectionRef))]);

	const workers =
		workerName !== ''
			? specifySnapshotIntoData(dataSnapshot).filter(data => new RegExp(workerName, 'g').test(data.workerName))
			: specifySnapshotIntoData(dataSnapshot);

	return {
		workers,
		totalLength: countSnapshot.data().count,
	};
};

const getWorkersOverview = async ({ inOrder, year, month, workerName }: WorkerQuery) => {
	const data = await getWorkers({ inOrder, year, month, workerName });

	return {
		workers: addSumOfPaymentForEachWorker(data, inOrder),
		sumOfPayment: data?.workers.reduce((acc, worker) => (acc += +worker.payment), 0),
	};
};

const getWorkersDetail = async ({ inOrder, year, month, workerName }: WorkerQuery) => {
	const data = await getWorkers({ inOrder, year, month, workerName });

	return {
		workers: sortByNameAndWorkedDate(data?.workers, inOrder),
		totalLength: data?.totalLength,
		sumOfPayment: data?.workers.reduce((acc, worker) => (acc += +worker.payment), 0),
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

export type { WorkersDetailBySort };
export {
	getWorkersDetailByPage,
	getWorkers,
	getWorkersOverview,
	getWorkersDetail,
	getSpecificWorker,
	addWorker,
	editWorker,
	removeWorker,
	sortByNameAndWorkedDate,
};
