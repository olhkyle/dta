import { SkeletonItem } from '../..';
import { useTheme } from '../../../hooks';

const ExpenseLineChartLoader = () => {
	const [theme] = useTheme();

	return <SkeletonItem width={'100%'} height={'400px'} theme={theme} />;
};

export default ExpenseLineChartLoader;
