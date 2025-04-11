import { useTheme } from '../../../hooks';
import { SkeletonItem } from '../../skeleton';

const TotalCostSumOfPaymentLoader = () => {
	const [theme] = useTheme();

	return <SkeletonItem width={'100%'} height={'50px'} theme={theme} />;
};

export default TotalCostSumOfPaymentLoader;
