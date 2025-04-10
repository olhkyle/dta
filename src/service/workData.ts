import { collection, query, where, doc, and, orderBy, getCountFromServer, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Worker } from '../components/register/RegisterForm';
import { WorkerQuery, WorkersPaginationQuery, WorkersQueryData } from '../queries';
import { SortOption, paginationQuery, sortWorkerData, specifySnapshotIntoData } from './utils';

export interface WorkerWithId extends Worker {
	id: string;
}

interface UniqueWorker extends WorkerWithId {
	sumOfPayment?: number;
}

type WorkersDetailBySort = ReturnType<typeof sortByNameAndWorkedDate>;

const COLLECTION_NAME = 'people';
const LIMIT_SIZE_PER_PAGE = 20;

const sortWorkersDataByWorkedDate = <T extends WorkerWithId>(data: T[], sortOption: SortOption) => {
	return data?.sort((prev, curr) => (sortOption === 'asc' ? prev?.workedDate - curr?.workedDate : curr?.workedDate - prev?.workedDate));
};

const addSumOfPaymentForEachWorker = (data: WorkersQueryData, sortOption: SortOption = 'asc') =>
	sortWorkerData(
		data.workers.reduce<UniqueWorker[]>((uniqueWorkers, worker) => {
			if (!checkExist(uniqueWorkers, worker.workerName)) {
				uniqueWorkers.push({ ...worker, sumOfPayment: getSumOfPaymentByWorkerName(data, worker.workerName) });
			}
			return uniqueWorkers;
		}, []),
		sortOption,
	);

const getSumOfPaymentByDefault = (data: Pick<WorkersQueryData, 'workers'>) => {
	return data?.workers.reduce((acc, worker) => (acc += +worker.payment), 0);
};

const getSumOfPaymentByWorkerName = (data: WorkersQueryData, targetName: string) => {
	return data?.workers
		.filter(({ workerName }) => workerName === targetName)
		.map(({ payment }) => +payment)
		.reduce((prev, curr) => prev + curr, 0);
};

const checkExist = (workers: WorkerWithId[], targetName: string) => workers.find(({ workerName }) => workerName === targetName);

const sortByNameAndWorkedDate = (workers: WorkerWithId[], sortOption: SortOption = 'asc') => {
	return Object.values(
		sortWorkerData(workers, sortOption).reduce<{ [key: string]: WorkerWithId[] }>((acc, worker) => {
			const { workerName } = worker;
			if (!acc[workerName]) {
				acc[workerName] = [];
			}

			acc[workerName].push(worker);
			return acc;
		}, {}),
	).flatMap((groupedWorkers, pos) =>
		sortWorkersDataByWorkedDate(groupedWorkers, sortOption).map((worker, idx) => ({
			...worker,
			position: pos,
			isFirstIdxOfArr: idx === 0,
		})),
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

const getWorkersByYearAndMonth = async ({ inOrder = 'asc', year, month, workerName }: WorkerQuery) => {
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

const getWorkersByYear = async ({ year }: Pick<WorkerQuery, 'year'>) => {
	const collectionRef = collection(db, COLLECTION_NAME);

	const queryByYear = (year: number) =>
		query(
			collectionRef,
			and(where('workedDate', '<', new Date(year + 1, 0, 1)), where('workedDate', '>=', new Date(year, 0, 1))),
			orderBy('workedDate', 'asc'),
		);

	const dataSnapshot = await getDocs(queryByYear(year));

	const workers = specifySnapshotIntoData(dataSnapshot);
	const totalCount = [...new Set(workers.map(({ workerName }) => workerName))].length;

	return { workers, totalCount };
};

const getWorkersOverviewByYearAndMonth = async ({ year, month, workerName }: WorkerQuery) => {
	const data = await getWorkersByYearAndMonth({ year, month, workerName });

	return {
		workers: addSumOfPaymentForEachWorker(data),
		sumOfPayment: getSumOfPaymentByDefault(data),
	};
};

const getWorkersOverviewByYear = async ({ year }: Pick<WorkerQuery, 'year'>) => {
	const data = await getWorkersByYear({ year });

	return {
		sumOfPayment: getSumOfPaymentByDefault(data),
		totalCount: data.totalCount,
	};
};

const getWorkersDetail = async ({ inOrder, year, month, workerName }: WorkerQuery) => {
	const data = await getWorkersByYearAndMonth({ inOrder, year, month, workerName });

	return {
		workers: sortByNameAndWorkedDate(data?.workers, inOrder),
		totalLength: data?.totalLength,
		sumOfPayment: data?.workers.reduce((acc, worker) => (acc += +worker.payment), 0),
	};
};

const getSpecificWorker = async ({ workerName }: Pick<WorkerQuery, 'workerName'>) => {
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
	getWorkersByYearAndMonth,
	getWorkersOverviewByYearAndMonth,
	getWorkersOverviewByYear,
	getWorkersDetail,
	getSpecificWorker,
	addWorker,
	editWorker,
	removeWorker,
	sortByNameAndWorkedDate,
};
