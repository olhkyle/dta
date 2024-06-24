import {
	CollectionReference,
	DocumentData,
	QueryCompositeFilterConstraint,
	QueryOrderByConstraint,
	QuerySnapshot,
	getCountFromServer,
	getDocs,
	limit,
	query,
	startAfter,
} from 'firebase/firestore';
import { Worker } from '../components/register/RegisterForm';
import { WorkerWithId } from '../service/workData';

interface PaginationQuery {
	collectionRef: CollectionReference<DocumentData, DocumentData>;
	pageParam: number;
	searchCondition: QueryCompositeFilterConstraint;
	orderCondition: QueryOrderByConstraint;
	createdAtCondition: QueryOrderByConstraint;
	limitSizePerPage: number;
}

type ReturnTypeOfPaginationQuery = Awaited<ReturnType<typeof paginationQuery>>;
type SortOption = 'asc' | 'desc';

const paginationQuery = async ({
	collectionRef,
	pageParam,
	searchCondition,
	orderCondition,
	createdAtCondition,
	limitSizePerPage,
}: PaginationQuery) => {
	const q = pageParam
		? query(collectionRef, searchCondition, orderCondition, createdAtCondition, startAfter(pageParam), limit(limitSizePerPage))
		: query(collectionRef, searchCondition, orderCondition, createdAtCondition, limit(limitSizePerPage));

	const data = await getDocs(q);
	const snapshot = await getCountFromServer(query(collectionRef));

	return {
		data: specifySnapshotIntoData(data),
		totalLength: snapshot.data().count,
		nextPage: data.size === limitSizePerPage ? data.docs[data.docs.length - 1] : undefined,
	};
};

const specifySnapshotIntoData = (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
	return snapshot.docs.map(doc => {
		const specifiedData = doc.data() as Worker;

		return {
			...specifiedData,
			id: doc.id,
			workedDate: formattedWorkedDate(specifiedData),
			createdAt: formattedCreatedAt(specifiedData),
		};
	});
};

const formattedWorkedDate = (data: Worker) => data?.workedDate?.toDate();
const formattedCreatedAt = (data: Worker) => data?.createdAt?.toDate();

const sortWorkerData = <T extends WorkerWithId>(data: T[], inOrder: SortOption) => {
	return data?.sort((prev, curr) => (inOrder === 'asc' ? prev?.createdAt - curr?.createdAt : curr?.createdAt - prev?.createdAt));
};

export type { ReturnTypeOfPaginationQuery, SortOption };
export default sortWorkerData;

export { paginationQuery, specifySnapshotIntoData, formattedWorkedDate };
