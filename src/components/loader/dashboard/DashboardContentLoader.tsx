import styled from '@emotion/styled';
import { Flex, SkeletonItem } from '../..';
import { useMediaQuery, useTheme } from '../../../hooks';

const DashboardContentLoader = () => {
	const [theme] = useTheme();
	const isMobile = useMediaQuery('(max-width: 640px)');

	return (
		<Flex direction={'column'} justifyContent={'space-between'} gap={'16px'} margin={'16px auto'} width={'100%'}>
			<OverviewGrid>
				<SkeletonItem width={'100%'} height={isMobile ? '110px' : '165px'} theme={theme} />
				<SkeletonItem width={'100%'} height={isMobile ? '110px' : '165px'} theme={theme} />
				<SkeletonItem width={'100%'} height={isMobile ? '155px' : '165px'} theme={theme} />
			</OverviewGrid>
			<ChartAndListGrid>
				<SkeletonItem width={'100%'} height={'550px'} theme={theme} />
				<SkeletonItem width={'100%'} height={'550px'} theme={theme} />
			</ChartAndListGrid>
		</Flex>
	);
};

const OverviewGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;
	width: 100%;

	@media screen and (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const ChartAndListGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;

	width: 100%;

	@media screen and (min-width: 960px) {
		grid-template-columns: 2fr 1fr;
	}
`;

export default DashboardContentLoader;
