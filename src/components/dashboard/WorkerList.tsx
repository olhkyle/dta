import { Suspense } from 'react';
import styled from '@emotion/styled';
import { PiUserListBold } from 'react-icons/pi';
import { Flex, Label, WorkerListView, WorkerListViewLoader } from '..';
import { WorkerQuery } from '../../queries';

interface WorkerListProps {
	year: WorkerQuery['year'];
}

const WorkerList = ({ year }: WorkerListProps) => {
	return (
		<Container direction={'column'} justifyContent={'space-between'} alignItems={'flex-start'} gap={'8px'} padding={'var(--padding-md)'}>
			<Label>
				일용직 리스트
				<PiUserListBold size="21" color="var(--color-gray-500)" />
			</Label>

			<Suspense fallback={<WorkerListViewLoader />}>
				<WorkerListView year={year} />
			</Suspense>
		</Container>
	);
};

const Container = styled(Flex)`
	border: 1px solid var(--border-color);
	border-radius: var(--radius);
`;

export default WorkerList;
