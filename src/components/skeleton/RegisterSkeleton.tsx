import styled from '@emotion/styled';
import { Flex, Spacer } from '..';

const RegisterSkeleton = () => {
	return (
		<Flex margin="0 auto">
			<SkeletonForm>
				<SkeletonText className="skeleton-loading" />
				<Spacer size={8} />
				<SkeletonInput className="skeleton-loading">
					<div />
				</SkeletonInput>
				<CustomFlex alignItems="flex-start" gap="0.5rem">
					<SkeletonInput className="skeleton-loading">
						<div />
					</SkeletonInput>
					<SkeletonInput className="skeleton-loading">
						<div />
					</SkeletonInput>
				</CustomFlex>
			</SkeletonForm>
		</Flex>
	);
};

const SkeletonForm = styled.form`
	display: flex;
	flex-direction: column;

	gap: 24px;
	margin: 0 auto;
	padding-top: 80px;
	padding-bottom: 80px;
`;

const SkeletonText = styled.div`
	padding: 16px;
	width: 300px;
	height: 50px;
	border: none;
	border-radius: var(--radius);
	background-color: var(--skeleton-bg-color);

	@media screen and (min-width: 640px) {
		padding: 16px 32px;
	}
`;

const SkeletonInput = styled.div`
	display: flex;
	flex-direction: column;

	div {
		padding: 16px;
		width: 300px;
		height: 60px;
		border: none;
		border-radius: var(--radius);
		background-color: var(--skeleton-bg-color);

		@media screen and (min-width: 640px) {
			padding: 16px 32px;
		}
	}
`;

const CustomFlex = styled(Flex)`
	flex-direction: column;

	@media screen and (min-width: 640px) {
		flex-direction: row;
	}
`;

export default RegisterSkeleton;
