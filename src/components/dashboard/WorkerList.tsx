import styled from '@emotion/styled';
import { PiUserListBold } from 'react-icons/pi';
import { Flex, Label, WorkerListView } from '..';
import { WorkersOverviewDashboardData } from '../../service/workData';
import { WorkerQuery } from '../../queries';

interface WorkerListProps {
	data?: WorkersOverviewDashboardData;
	year: WorkerQuery['year'];
}

const WorkerList = ({ data, year }: WorkerListProps) => {
	return (
		<Container direction={'column'} justifyContent={'space-between'} alignItems={'flex-start'} gap={'8px'} padding={'var(--padding-md)'}>
			<Label>
				일용직 리스트
				<PiUserListBold size="21" color="var(--color-gray-500)" />
			</Label>
			<WorkerListView data={data} year={year} />
		</Container>
	);
};

const Container = styled(Flex)`
	max-width: auto;
	border: 1px solid var(--border-color);
	border-radius: var(--radius);

	@media screen and (min-width: 640px) {
		min-width: 300px;
	}
`;

export default WorkerList;
