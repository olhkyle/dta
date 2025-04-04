import styled from '@emotion/styled';
import { Flex, SkeletonItem, Spacer } from '..';
import { useMediaQuery, useTheme } from '../../hooks';

const RegisterSkeleton = () => {
	const [theme] = useTheme();
	const isMobile = useMediaQuery('(max-width: 640px)');

	return (
		<Container>
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
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	margin: 0 auto;
	padding: 80px 0;
	max-width: 600px;
	width: calc(100dvw - 32px);
`;

export default RegisterSkeleton;
