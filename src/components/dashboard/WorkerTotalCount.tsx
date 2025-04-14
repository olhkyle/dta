import styled from '@emotion/styled';
import { IoMdPerson } from 'react-icons/io';
import { Flex, Label, WorkerTotalCountItem } from '..';
import { WorkersOverviewDashboardData } from '../../service/workData';

interface WorkerTotalCountProps {
	data?: WorkersOverviewDashboardData;
}

const WorkerTotalCount = ({ data }: WorkerTotalCountProps) => {
	return (
		<Container direction={'column'} justifyContent={'space-between'} alignItems={'flex-start'} gap={'8px'} padding={'var(--padding-md)'}>
			<Label>
				<div>총 일용직</div>
				<IoMdPerson size="21" color="var(--color-gray-500)" />
			</Label>
			<WorkerTotalCountItem data={data} />
		</Container>
	);
};

const Container = styled(Flex)`
	padding: var(--padding-md);
	border: 1px solid var(--border-color);
	border-radius: var(--radius);
`;

export default WorkerTotalCount;
