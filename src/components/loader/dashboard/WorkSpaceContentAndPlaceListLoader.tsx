import { Flex, SkeletonItem } from '../..';
import { useTheme } from '../../../hooks';

const WorkSpaceContentAndPlaceListLoader = () => {
	const [theme] = useTheme();
	return (
		<Flex direction={'column'} gap={'8px'} width={'100%'}>
			<SkeletonItem width={'100%'} height={'50px'} theme={theme} />
			<Flex margin={'8px 0 0'} gap={'8px'} width={'100%'} css={{ flexWrap: 'wrap' }}>
				<SkeletonItem width={'85px'} height={'30px'} theme={theme} />
			</Flex>
		</Flex>
	);
};

export default WorkSpaceContentAndPlaceListLoader;
