import { SkeletonItem } from '../..';
import { useMediaQuery, useTheme } from '../../../hooks';

const DetailsSegmentedControlLoader = () => {
	const [theme] = useTheme();
	const [isTablet, isMobile] = [useMediaQuery('(max-width: 768px)'), useMediaQuery('(max-width: 640px)')];

	return (
		<SkeletonItem
			width={isMobile ? '130px' : isTablet ? '152px' : '160px'}
			height={isMobile ? '35px' : isTablet ? '45px' : '50px'}
			theme={theme}
		/>
	);
};

export default DetailsSegmentedControlLoader;
