import styled from '@emotion/styled';
import { Content } from '.';
import { WorkerQuery } from '../../queries';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants';
import { getWorkersOverviewByYear } from '../../service/workData';
import { Button } from '../common';
import { useState } from 'react';
import { useClickOutside } from '../../hooks';

interface WorkSpaceContentAndPlaceListProps {
	year: WorkerQuery['year'];
}

const WorkSpaceContentAndPlaceList = ({ year }: WorkSpaceContentAndPlaceListProps) => {
	const { data } = useQuery({
		queryKey: [...queryKey.WORKERS_OVERVIEW_DASHBOARD, year],
		queryFn: () => getWorkersOverviewByYear({ year }),
	});

	const [isOpen, setIsOpen] = useState(false);
	const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

	return (
		<>
			<Content>
				<div>+ {data?.allWorkspaces.length}</div>
				<span>곳</span>
			</Content>

			{data?.allWorkspaces.length && data?.allWorkspaces.filter(workspace => workspace !== undefined).length ? (
				<ListArea ref={ref}>
					<ListToggleButton type="button" onClick={() => setIsOpen(!isOpen)}>
						리스트 보기
					</ListToggleButton>
					{isOpen && (
						<PlaceList>
							{data?.allWorkspaces.map((workspace, idx) => workspace && <li key={`${idx}_${workspace}`}>{workspace}</li>)}
						</PlaceList>
					)}
				</ListArea>
			) : null}
		</>
	);
};

const ListArea = styled.div`
	position: relative;
`;

const ListToggleButton = styled(Button)`
	padding: var(--padding-sm);
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);
`;

const PlaceList = styled.ul`
	position: absolute;
	top: 32px;
	display: flex;
	max-width: 320px;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;
	margin-top: 8px;
	padding: var(--padding-sm);
	background-color: var(--bg-color);
	border: 1px solid var(--border-color);
	border-radius: var(--radius);

	li {
		padding: calc(var(--padding-sm) * 0.5) var(--padding-sm);
		min-width: 150px;
		color: var(--text-color);
		background-color: var(--btn-light-bg-color);
		font-size: var(--fz-sm);
		font-weight: var(--fw-medium);
		border: 1px solid var(--border-color);
		border-radius: var(--radius);
	}
`;

export default WorkSpaceContentAndPlaceList;
