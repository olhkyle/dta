import { useMediaQuery, useTheme } from '../../../hooks';
import { SkeletonItem } from '../../skeleton';

const OverviewSegmentedControlLoader = () => {
	const [theme] = useTheme();
	const isMobile = useMediaQuery('(max-width: 640px)');

	return <SkeletonItem width={isMobile ? '130px' : '160px'} height={isMobile ? '35px' : '45px'} theme={theme} />;
};

export default OverviewSegmentedControlLoader;
