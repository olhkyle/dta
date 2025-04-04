import { SkeletonItem } from '../../skeleton';
import { useMediaQuery, useTheme } from '../../../hooks';

const OverviewSumOfPaymentLoader = () => {
	const [theme] = useTheme();
	const isMobile = useMediaQuery('(max-width: 640px)');

	return <SkeletonItem width={isMobile ? '130px' : '150px'} height={isMobile ? '35px' : '40px'} theme={theme} />;
};

export default OverviewSumOfPaymentLoader;
