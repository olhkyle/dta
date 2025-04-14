import styled from '@emotion/styled';
import { Text } from '..';
import { WorkersOverviewDashboardData } from '../../service/workData';
import { useMediaQuery } from '../../hooks';
import { WorkerQuery } from '../../queries';

interface WorkerListViewProps {
	data?: WorkersOverviewDashboardData;
	year: WorkerQuery['year'];
}

const WorkerListView = ({ data, year }: WorkerListViewProps) => {
	const isMobile = useMediaQuery('(max-width: 640px)');
	const workers = Object.entries(data?.workersList ?? {}).sort((prev, curr) => curr[1] - prev[1]);

	return (
		<>
			{workers.length === 0 ? (
				<EmptyMessage>⚡️ 일한 일용직이 없습니다</EmptyMessage>
			) : (
				<List>
					{workers.slice(0, 10).map(([key, value]) => (
						<Worker key={key}>
							<Text typo={isMobile ? 'h7' : 'h6'} color="var(--text-color)">
								{key}
							</Text>
							<Text typo={isMobile ? 'h6' : 'h5'} color="var(--text-color)">
								+{value}
							</Text>
						</Worker>
					))}
				</List>
			)}
			<Description>
				<span>{year}</span>에 <span>{workers.length}</span>명이 일하였습니다
				<p>﹡ 위 데이터는 가장 많은 날을 일한 사람 순으로 최대 10명을 보여줍니다</p>
			</Description>
		</>
	);
};

const EmptyMessage = styled.div`
	width: 100%;
	font-size: var(--fz-rp);
	font-weight: var(--fw-semibold);
	color: var(--disabled-text-color);
	border-radius: var(--radius);
	text-align: center;
`;

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

const Description = styled.div`
	margin-top: 16px;
	padding: calc(var(--padding-sm) * 0.5) var(--padding-sm);
	width: 100%;
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
