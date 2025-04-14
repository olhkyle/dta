import styled from '@emotion/styled';
import { MdPlace } from 'react-icons/md';
import { Flex, Label, WorkSpaceContentAndPlaceList, WorkSpaceContentAndPlaceListLoader } from '..';
import { WorkerQuery } from '../../queries';
import { Suspense } from 'react';

interface WorkSpaceProps {
	year: WorkerQuery['year'];
}

const WorkSpace = ({ year }: WorkSpaceProps) => {
	return (
		<Container direction={'column'} justifyContent={'space-between'} alignItems={'flex-start'} gap={'8px'} padding={'var(--padding-md)'}>
			<Label>
				<div>근로지역</div>
				<MdPlace size="21" color="var(--color-gray-500)" />
			</Label>
			<Suspense fallback={<WorkSpaceContentAndPlaceListLoader />}>
				<WorkSpaceContentAndPlaceList year={year} />
			</Suspense>
		</Container>
	);
};

const Container = styled(Flex)`
	border: 1px solid var(--border-color);
	border-radius: var(--radius);
`;

export default WorkSpace;
