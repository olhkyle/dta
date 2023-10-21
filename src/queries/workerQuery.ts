import { WorkerWithId } from '../service/workData';
import { monthOfToday, yearOfToday } from '../constants/day';
import { ControlValues } from '../constants/sortControls';

type Pagination<T> = {
	paginationData: T[];
	totalPayment: number;
};

interface WorkersQueryData {
	workers: WorkerWithId[];
	totalLength: number;
}

interface WorkerQuery {
	inOrder: ControlValues;
	year: number;
	month: number;
	workerName: string;
}

interface WorkersPaginationQuery extends WorkerQuery {
	pageParam: number;
}

const workerQuery: WorkerQuery = {
	inOrder: 'asc',
	year: yearOfToday,
	month: monthOfToday,
	workerName: '',
};

export type { Pagination, WorkersQueryData, WorkerQuery, WorkersPaginationQuery };
export { workerQuery };
