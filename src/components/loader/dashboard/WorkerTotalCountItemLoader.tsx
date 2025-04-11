import { SkeletonItem } from '../..';
import { useTheme } from '../../../hooks';

const WorkerTotalCountItemLoader = () => {
	const [theme] = useTheme();

	return <SkeletonItem width={'100%'} height={'50px'} theme={theme} />;
};

export default WorkerTotalCountItemLoader;
