import { getWorkersOverview } from '../service/workData';
import { monthOfToday, yearOfToday } from '../constants/day';
import { WorkerQuery } from './workerQuery';
import { queryKey } from '../constants';

const staleTime = 1000 * 5;

// 데이터의 크기가 매우 크거나 (수천 건 이상), 서버 측 정렬이 특별히 필요한 경우 (예: 페이지네이션)에는 서버 측 정렬을 고려해야 할 수 있으나, 현재는 사람마다 해당 월의 값의 합계를 화면에 보여줘야 하므로,불필요한 서버 네트워크 요청 필요 없이,데이터를 sort하는 것으로 코드 변경
const getWorkersOverviewQuery = ({ year = yearOfToday, month = monthOfToday, workerName = '' }: WorkerQuery) => ({
	queryKey: [queryKey.WORKERS_OVERVIEW, `${year}-${month}`, workerName],
	queryFn: async () => {
		const data = await getWorkersOverview({ year, month, workerName });
		return data;
	},
	onError: (error: unknown) => console.error(error),
	staleTime,
});

export default getWorkersOverviewQuery;
