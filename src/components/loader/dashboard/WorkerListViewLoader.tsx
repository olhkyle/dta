import { useTheme } from '../../../hooks';
import { Flex } from '../../common';
import { SkeletonItem } from '../../skeleton';

const WorkerListViewLoader = () => {
	const [theme] = useTheme();

	return (
		<Flex direction={'column'} gap={'8px'} margin={'16px 0 0'} width={'100%'}>
			{Array.from({ length: 10 }, (_, idx) => (
				<SkeletonItem key={idx} width={'100%'} height={'30px'} theme={theme} />
			))}
		</Flex>
	);
};

export default WorkerListViewLoader;
