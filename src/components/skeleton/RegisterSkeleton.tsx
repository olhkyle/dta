import { Flex, SkeletonItem, Spacer } from '..';
import { useMediaQuery, useTheme } from '../../hooks';

const RegisterSkeleton = () => {
	const [theme] = useTheme();
	const isMobile = useMediaQuery('(max-width: 640px)');

	return (
		<Flex
			direction={'column'}
			gap={'24px'}
			alignItems={'flex-start'}
			margin={'0 auto'}
			padding={'80px 0'}
			maxWidth={'600px'}
			width={'calc(100dvw - 32px)'}>
			<SkeletonItem width={'280px'} height={'50px'} theme={theme} />
			<Spacer size={8} />
			<SkeletonItem width={'100%'} height={'60px'} theme={theme} />
			<Flex direction={isMobile ? 'column' : 'row'} gap="16px" width={'100%'}>
				<SkeletonItem width={'100%'} height={'60px'} theme={theme} />
				<SkeletonItem width={'100%'} height={'60px'} theme={theme} />
			</Flex>
			<SkeletonItem width={'100%'} height={'60px'} theme={theme} />
			<Flex direction={isMobile ? 'column' : 'row'} gap="16px" width={'100%'}>
				<SkeletonItem width={'100%'} height={'60px'} theme={theme} />
				<SkeletonItem width={'100%'} height={'60px'} theme={theme} />
			</Flex>
			<Flex direction={isMobile ? 'column' : 'row'} gap="16px" width={'100%'}>
				<SkeletonItem width={'100%'} height={'60px'} theme={theme} />
				<SkeletonItem width={'100%'} height={'60px'} theme={theme} />
			</Flex>
			<SkeletonItem width={'100%'} height={'60px'} theme={theme} />
		</Flex>
	);
};

export default RegisterSkeleton;
