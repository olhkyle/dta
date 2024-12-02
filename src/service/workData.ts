import { collection, query, where, doc, and, orderBy, getCountFromServer, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { SortOption, paginationQuery, sortWorkerData, specifySnapshotIntoData } from './utils';
import { Worker } from '../components/register/RegisterForm';
import { WorkerQuery, WorkersPaginationQuery, WorkersQueryData } from '../queries/workerQuery';

export interface WorkerWithId extends Worker {
	id: string;
}

interface UniqueWorker extends WorkerWithId {
	sumOfPayment?: number;
}

type WorkersDetailBySort = ReturnType<typeof sortByNameAndWorkedDate>;

const COLLECTION_NAME = 'people';
const LIMIT_SIZE_PER_PAGE = 20;

const addSumOfPaymentForEachWorker = (data: WorkersQueryData, inOrder: SortOption = 'asc') =>
	sortWorkerData(
		data.workers.reduce<UniqueWorker[]>((uniqueWorkers, worker) => {
			if (!checkExist(uniqueWorkers, worker.workerName)) {
				uniqueWorkers.push({ ...worker, sumOfPayment: getSumOfPayment(data, worker.workerName) });
			}
			return uniqueWorkers;
		}, []),
		inOrder,
	);

const getSumOfPayment = (data: WorkersQueryData, targetName: string) =>
	data?.workers
		.filter(({ workerName }) => workerName === targetName)
		.map(({ payment }) => +payment)
		.reduce((prev, curr) => prev + curr, 0);

const checkExist = (workers: WorkerWithId[], targetName: string) => workers.find(({ workerName }) => workerName === targetName);

const sortByNameAndWorkedDate = (workers: WorkerWithId[], inOrder: SortOption = 'asc') => {
	return Object.values(
		sortWorkerData(workers, inOrder).reduce<{ [key: string]: WorkerWithId[] }>((acc, worker) => {
			const { workerName } = worker;
			if (!acc[workerName]) {
				acc[workerName] = [];
			}

			acc[workerName].push(worker);
			return acc;
		}, {}),
	).flatMap((groupedWorkers, pos) =>
		sortWorkerData(groupedWorkers, inOrder).map((worker, idx) => ({ ...worker, position: pos, isFirstIdxOfArr: idx === 0 })),
	);
};

const getWorkersDetailByPage = async ({ inOrder, year, month, workerName, pageParam }: WorkersPaginationQuery) => {
	const collectionRef = collection(db, COLLECTION_NAME);

	const searchConditionByMonth = (year: number, month: number) =>
		and(where('workedDate', '<', new Date(year, month, 1)), where('workedDate', '>=', new Date(year, month - 1, 1)));

	const orderCondition = orderBy('workedDate', inOrder);
	const createdAtCondition = orderBy('createdAt', inOrder);

	const q = query(collectionRef, searchConditionByMonth(year, month), orderCondition, createdAtCondition);

	const [paginationData, dataSnapshot] = await Promise.all([
		paginationQuery({
			collectionRef,
			pageParam,
			searchCondition: searchConditionByMonth(year, month),
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

const getWorkers = async ({ inOrder = 'asc', year, month, workerName }: WorkerQuery) => {
	const collectionRef = collection(db, COLLECTION_NAME);

	const queryByMonth = (year: number, month: number) =>
		query(
			collectionRef,
			and(where('workedDate', '<', new Date(year, month, 1)), where('workedDate', '>=', new Date(year, month - 1, 1))),
			orderBy('workedDate', inOrder),
		);

	const [dataSnapshot, countSnapshot] = await Promise.all([getDocs(queryByMonth(year, month)), getCountFromServer(query(collectionRef))]);

	const workers =
		workerName !== ''
			? specifySnapshotIntoData(dataSnapshot).filter(data => new RegExp(workerName, 'g').test(data.workerName))
			: specifySnapshotIntoData(dataSnapshot);

	return {
		workers,
		totalLength: countSnapshot.data().count,
	};
};

const getWorkersOverview = async ({ year, month, workerName }: WorkerQuery) => {
	const data = await getWorkers({ year, month, workerName });

	return {
		workers: addSumOfPaymentForEachWorker(data),
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
