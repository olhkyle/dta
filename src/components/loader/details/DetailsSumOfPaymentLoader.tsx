import { SkeletonItem } from '../..';
import { useMediaQuery, useTheme } from '../../../hooks';

const DetailsSumOfPaymentLoader = () => {
	const [theme] = useTheme();
	const isMobile = useMediaQuery('(max-width: 640px)');

	return <SkeletonItem width={isMobile ? '130px' : '140px'} height={isMobile ? '35px' : '50px'} theme={theme} />;
};

export default DetailsSumOfPaymentLoader;
