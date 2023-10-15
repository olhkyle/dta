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

interface PaginationQuery {
	collectionRef: CollectionReference<DocumentData, DocumentData>;
	pageParam: number;
	searchCondition: QueryCompositeFilterConstraint;
	orderCondition: QueryOrderByConstraint;
	limitSizePerPage: number;
}

export type ReturnTypeOfPaginationQuery = Awaited<ReturnType<typeof paginationQuery>>;

const paginationQuery = async ({ collectionRef, pageParam, searchCondition, orderCondition, limitSizePerPage }: PaginationQuery) => {
	const q = pageParam
		? query(collectionRef, searchCondition, orderCondition, startAfter(pageParam), limit(limitSizePerPage))
		: query(collectionRef, searchCondition, orderCondition, limit(limitSizePerPage));

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
		};
	});
};

const formattedWorkedDate = (data: Worker) => data?.workedDate?.toDate();

export { paginationQuery, specifySnapshotIntoData, formattedWorkedDate };
