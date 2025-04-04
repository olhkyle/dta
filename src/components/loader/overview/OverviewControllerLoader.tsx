import styled from '@emotion/styled';
import { SkeletonItem, Flex } from '../..';
import { useMediaQuery, useTheme } from '../../../hooks';

const OverviewControllerLoader = () => {
	const [theme] = useTheme();
	const isMobile = useMediaQuery('(max-width: 640px)');

	return (
		<Group>
			<Flex margin="0" gap="16px">
				<SkeletonItem width={isMobile ? '65px' : '100px'} height={isMobile ? '35px' : '50px'} theme={theme} />
				<SkeletonItem width={isMobile ? '130px' : '160px'} height={isMobile ? '35px' : '50px'} theme={theme} />
				<SkeletonItem width={isMobile ? '90px' : '140px'} height={isMobile ? '35px' : '50px'} theme={theme} />
				<SkeletonItem width={isMobile ? '65px' : '100px'} height={isMobile ? '35px' : '50px'} theme={theme} />
			</Flex>
			<Flex justifyContent="flex-end" margin="16px 0">
				<SkeletonItem width={isMobile ? '130px' : '140px'} height={isMobile ? '35px' : '50px'} theme={theme} />
			</Flex>
		</Group>
	);
};

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

export default OverviewControllerLoader;
