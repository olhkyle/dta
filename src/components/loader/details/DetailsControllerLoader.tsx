import styled from '@emotion/styled';
import { SkeletonItem, Flex } from '../..';
import { useMediaQuery, useTheme } from '../../../hooks';

const DetailsControllerLoader = () => {
	const [theme] = useTheme();
	const [isTablet, isMobile] = [useMediaQuery('(max-width: 768px)'), useMediaQuery('(max-width: 640px)')];

	return (
		<Container>
			<Group>
				<Flex margin="0" gap="16px">
					<SkeletonItem
						width={isMobile ? '130px' : isTablet ? '152px' : '160px'}
						height={isMobile ? '35px' : isTablet ? '45px' : '50px'}
						theme={theme}
					/>
					<SkeletonItem
						width={isMobile ? '90px' : isTablet ? '120px' : '140px'}
						height={isMobile ? '35px' : isTablet ? '45px' : '50px'}
						theme={theme}
					/>
					<SkeletonItem
						width={isMobile ? '65px' : isTablet ? '94px' : '100px'}
						height={isMobile ? '35px' : isTablet ? '45px' : '50px'}
						theme={theme}
					/>
				</Flex>
				{!isMobile && (
					<Flex justifyContent="flex-end" margin="0 0">
						<SkeletonItem width={isMobile ? '130px' : '88px'} height={isMobile ? '35px' : '45px'} theme={theme} />
					</Flex>
				)}
			</Group>
			<Flex justifyContent="flex-end" margin="36px 0">
				<SkeletonItem width={isMobile ? '130px' : '140px'} height={isMobile ? '35px' : '50px'} theme={theme} />
			</Flex>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
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

export default DetailsControllerLoader;
