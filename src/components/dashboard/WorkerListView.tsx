import styled from '@emotion/styled';
import { getWorkersOverviewByYear } from '../../service/workData';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants';
import { WorkerQuery } from '../../queries';

interface WorkerListViewProps {
	year: WorkerQuery['year'];
}

const WorkerListView = ({ year }: WorkerListViewProps) => {
	const { data } = useQuery({
		queryKey: [...queryKey.WORKERS_OVERVIEW_DASHBOARD, year],
		queryFn: () => getWorkersOverviewByYear({ year }),
	});

	const workers = Object.entries(data?.workersList ?? {}).sort((prev, curr) => curr[1] - prev[1]);

	return (
		<>
			<List>
				{workers.slice(0, 10).map(([key, value]) => (
					<Worker key={key}>
						<Name>{key}</Name>
						<Count>+{value}</Count>
					</Worker>
				))}
			</List>
			<Description>
				<span>{year}</span>에 <span>{workers.length}</span>명이 일하였습니다
				<p>﹡ 위 데이터는 가장 많은 날을 일한 사람 순으로 최대 10명을 보여줍니다</p>
			</Description>
		</>
	);
};

const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-top: 16px;
	width: 100%;
`;

const Worker = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Name = styled.div`
	font-size: var(--fz-h6);
	font-weight: var(--fw-medium);
`;

const Count = styled.div`
	font-size: var(--fz-h6);
	font-weight: var(--fw-bold);
`;

const Description = styled.div`
	margin-top: 8px;
	padding: calc(var(--padding-sm) * 0.5) var(--padding-sm);
	color: var(--disabled-text-color);
	background-color: var(--btn-light-bg-color);
	border-radius: var(--radius);

	span {
		font-weight: var(--fw-semibold);
	}

	p {
		font-size: var(--fz-sm);
	}
`;

export default WorkerListView;
