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

	gap: 1.5rem;
	margin: 0 auto;
	padding-top: 5rem;
	padding-bottom: 5rem;
`;

const SkeletonText = styled.div`
	padding: 1rem 1rem;
	width: 300px;
	height: 50px;
	border: none;
	border-radius: 8px;
	background-color: var(--outline-color);

	@media screen and (min-width: 640px) {
		padding: 1rem 2rem;
	}
`;

const SkeletonInput = styled.div`
	display: flex;
	flex-direction: column;

	div {
		padding: 1rem 1rem;
		width: 300px;
		height: 60px;
		border: none;
		border-radius: 8px;
		background-color: var(--outline-color);

		@media screen and (min-width: 640px) {
			padding: 1rem 2rem;
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
