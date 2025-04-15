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
			<Flex direction={'column'} alignItems={'flex-start'} gap={'4px'} width={'100%'}>
				<SkeletonItem width={'30%'} height={'30px'} theme={theme} />
				<SkeletonItem width={'100%'} height={'50px'} theme={theme} />
			</Flex>
			<Flex direction={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'flex-start' : 'center'} gap="16px" width={'100%'}>
				<Flex direction={'column'} alignItems={'flex-start'} gap={'4px'} width={'100%'}>
					<SkeletonItem width={'30%'} height={'30px'} theme={theme} />
					<SkeletonItem width={'100%'} height={'50px'} theme={theme} />
				</Flex>
				<Flex direction={'column'} alignItems={'flex-start'} gap={'4px'} width={'100%'}>
					<SkeletonItem width={'30%'} height={'30px'} theme={theme} />
					<SkeletonItem width={'100%'} height={'50px'} theme={theme} />
				</Flex>
			</Flex>
			<Flex direction={'column'} alignItems={'flex-start'} gap={'4px'} width={'100%'}>
				<SkeletonItem width={'30%'} height={'30px'} theme={theme} />
				<SkeletonItem width={'100%'} height={'50px'} theme={theme} />
			</Flex>
			<Flex direction={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'flex-start' : 'center'} gap="16px" width={'100%'}>
				<Flex direction={'column'} alignItems={'flex-start'} gap={'4px'} width={'100%'}>
					<SkeletonItem width={'30%'} height={'30px'} theme={theme} />
					<SkeletonItem width={'100%'} height={'50px'} theme={theme} />
				</Flex>
				<Flex direction={'column'} alignItems={'flex-start'} gap={'4px'} width={'100%'}>
					<SkeletonItem width={'30%'} height={'30px'} theme={theme} />
					<SkeletonItem width={'100%'} height={'50px'} theme={theme} />
				</Flex>
			</Flex>
			<Flex direction={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'flex-start' : 'center'} gap="16px" width={'100%'}>
				<Flex direction={'column'} alignItems={'flex-start'} gap={'4px'} width={'100%'}>
					<SkeletonItem width={'30%'} height={'30px'} theme={theme} />
					<SkeletonItem width={'100%'} height={'50px'} theme={theme} />
				</Flex>
				<Flex direction={'column'} alignItems={'flex-start'} gap={'4px'} width={'100%'}>
					<SkeletonItem width={'30%'} height={'30px'} theme={theme} />
					<SkeletonItem width={'100%'} height={'50px'} theme={theme} />
				</Flex>
			</Flex>
			<Flex direction={'column'} alignItems={'flex-start'} gap={'4px'} width={'100%'}>
				<SkeletonItem width={'30%'} height={'30px'} theme={theme} />
				<SkeletonItem width={'100%'} height={'50px'} theme={theme} />
			</Flex>
		</Flex>
	);
};

export default RegisterSkeleton;
