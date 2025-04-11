import { Suspense } from 'react';
import styled from '@emotion/styled';
import { IoMdPerson } from 'react-icons/io';
import { Flex, Label, WorkerTotalCountItem, WorkerTotalCountItemLoader } from '..';
import { WorkerQuery } from '../../queries';

interface WorkerTotalCountProps {
	year: WorkerQuery['year'];
}

const WorkerTotalCount = ({ year }: WorkerTotalCountProps) => {
	return (
		<Container direction={'column'} justifyContent={'space-between'} alignItems={'flex-start'} gap={'8px'} padding={'var(--padding-md)'}>
			<Label>
				<div>총 일용직</div>
				<IoMdPerson size="21" color="var(--color-gray-500)" />
			</Label>
			<Suspense fallback={<WorkerTotalCountItemLoader />}>
				<WorkerTotalCountItem year={year} />
			</Suspense>
		</Container>
	);
};

const Container = styled(Flex)`
	padding: var(--padding-md);
	border: 1px solid var(--border-color);
	border-radius: var(--radius);
`;

export default WorkerTotalCount;
