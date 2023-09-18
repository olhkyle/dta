import {
	CollectionReference,
	DocumentData,
	Query,
	QueryCompositeFilterConstraint,
	QuerySnapshot,
	getCountFromServer,
	getDocs,
	query,
} from 'firebase/firestore';
import { Worker } from '../components/register/RegisterForm';

interface PaginationQuery {
	collectionRef: CollectionReference<DocumentData, DocumentData>;
	q: Query<DocumentData, DocumentData>;
	limitSize: number;
}

const paginationQuery = async ({ collectionRef, q, limitSize }: PaginationQuery) => {
	const data = await getDocs(q);

	const snapshot = await getCountFromServer(query(collectionRef));

	return {
		data: specifySnapshotIntoData(data),
		totalLength: snapshot.data().count,
		nextPage: data.size === limitSize ? data.docs[data.docs.length - 1] : undefined,
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
// const formattedUpdatedAt = data => data?.updatedAt?.toDate();

export { paginationQuery, specifySnapshotIntoData, formattedWorkedDate };
