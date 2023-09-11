import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { Worker } from '../components/register/RegisterForm';

const paginationQuery = () => {};

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
