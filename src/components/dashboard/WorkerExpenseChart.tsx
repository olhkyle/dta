import styled from '@emotion/styled';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { ExpenseLineChart, Flex, HighlightText, Label } from '..';
import { WorkersOverviewDashboardData } from '../../service/workData';

interface WorkerExpenseChartProps {
	data?: WorkersOverviewDashboardData;
}

const WorkerExpenseChart = ({ data }: WorkerExpenseChartProps) => {
	return (
		<Container
			direction={'column'}
			justifyContent={'space-between'}
			alignItems={'center'}
			gap={'8px'}
			padding={'var(--padding-md)'}
			width={'100%'}>
			<Label>
				월별 비용
				<CiMoneyCheck1 size="24" color="var(--color-gray-500)" />
			</Label>
			<ExpenseLineChart data={data} />
			<ResponsiveFlex justifyContent={'flex-end'} margin={'16px auto 0'}>
				<HighlightText color={'var(--disabled-text-color)'} bgColor={'var(--btn-light-bg-color)'} fontSize={'var(--fz-sm)'}>
					💡 현재 화면 사이즈에서는 차트의 정확한 데이터를 파악하기 어렵습니다
				</HighlightText>
			</ResponsiveFlex>
		</Container>
	);
};

const Container = styled(Flex)`
	border: 1px solid var(--border-color);
	border-radius: var(--radius);
`;

const ResponsiveFlex = styled(Flex)`
	visibility: hidden;

	@media screen and (max-width: 640px) {
		visibility: visible;
	}
`;

export default WorkerExpenseChart;
