import { monthOfToday, yearOfToday } from '../constants/day';
import { ControlValues } from '../constants/sortControls';
import { WorkerWithId } from '../service/workData';

export interface WorkersQueryData {
	workers: WorkerWithId[];
	totalLength: number;
}

export interface WorkerQuery {
	inOrder: ControlValues;
	year: number;
	month: number;
	workerName: string;
}

const workerQuery: WorkerQuery = {
	inOrder: 'desc',
	year: yearOfToday,
	month: monthOfToday,
	workerName: '',
};

export default workerQuery;
