import styled from '@emotion/styled';
import { Flex, LayoutLoading, SkeletonItem } from '..';
import { useMediaQuery, useTheme } from '../../hooks';

const GeneralSkeleton = () => {
	const [theme] = useTheme();
	const isMobile = useMediaQuery('(max-width: 640px)');

	return (
		<Container>
			<Flex margin="48px auto 64px" padding="16px 16px 0" maxWidth="960px">
				<SkeletonItem width={'100%'} height={'70px'} theme={theme} />
			</Flex>
			<Group>
				<Flex margin="0" gap="16px">
					<Flex gap="16px">
						<SkeletonItem width={isMobile ? '65px' : '110px'} height={isMobile ? '35px' : '50px'} theme={theme} />
						<SkeletonItem width={isMobile ? '65px' : '170px'} height={isMobile ? '35px' : '50px'} theme={theme} />
					</Flex>
					<SkeletonItem width={isMobile ? '90px' : '180px'} height={isMobile ? '35px' : '50px'} theme={theme} />
					<SkeletonItem width={isMobile ? '90px' : '180px'} height={isMobile ? '35px' : '50px'} theme={theme} />
				</Flex>
				<Flex justifyContent="flex-end" margin="16px 0">
					<SkeletonItem width={isMobile ? '130px' : '180px'} height={isMobile ? '35px' : '50px'} theme={theme} />
				</Flex>
			</Group>
			<LayoutLoading />
		</Container>
	);
};

const Container = styled.div`
	padding: 0 16px;
	max-width: 1280px;
	width: 100%;
`;

const Group = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-top: 32px;
	width: 100%;

	@media screen and (min-width: 640px) {
		flex-direction: row;
		justify-content: space-between;
	}
`;

export default GeneralSkeleton;
