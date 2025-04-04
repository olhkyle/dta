import { Flex, SkeletonItem } from '../..';
import { useMediaQuery, useTheme } from '../../../hooks';

const DetailsPrintButtonLoader = () => {
	const [theme] = useTheme();
	const isMobile = useMediaQuery('(max-width: 640px)');

	return (
		<>
			{!isMobile && (
				<Flex justifyContent="flex-end" margin="0 0">
					<SkeletonItem width={isMobile ? '130px' : '88px'} height={isMobile ? '35px' : '45px'} theme={theme} />
				</Flex>
			)}
		</>
	);
};

export default DetailsPrintButtonLoader;
