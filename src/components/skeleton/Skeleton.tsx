import styled from '@emotion/styled';
import { Flex, LayoutLoading } from '../common';

const Skeleton = () => {
	return (
		<Container>
			<InputContainer justifyContent="center" gap="16px" margin="0 0">
				<Input className="skeleton-loading" />
			</InputContainer>
			<SearchFilters>
				<Flex margin="0 0" gap="16px">
					<SegmentedControl className="skeleton-loading">
						<Control />
						<Control />
					</SegmentedControl>
					<YearTrigger className="skeleton-loading" />
					<MonthTrigger className="skeleton-loading" />
				</Flex>
				<Flex justifyContent="flex-end" margin="16px 0">
					<SumOfPayment className="skeleton-loading" />
				</Flex>
			</SearchFilters>
			<LayoutLoading />
		</Container>
	);
};

const Container = styled.div`
	padding: 0 16px;
	max-width: 1280px;
	width: 100%;
`;

const InputContainer = styled(Flex)`
	margin: 48px auto 64px;
	padding: 16px 16px 0;
	max-width: 960px;
	width: 100%;
`;

const Input = styled.div`
	width: 100%;
	border: none;
	outline: none;
	overflow: hidden;

	@media screen and (min-width: 640px) {
		padding: 16px 32px;
	}

	@media screen and (min-width: 768px) {
	}
`;

const SearchFilters = styled.div`
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

const SegmentedControl = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
	padding: 4px;
	width: 180px;
	height: 50px;
	background-color: var(--skeleton-bg-color);
	border-radius: var(--radius);

	@media screen and (min-width: 640px) {
		padding: 8px;
	}
`;

const Control = styled.li`
	padding: 0.2rem 0.4rem;
	border-radius: var(--radius);

	@media screen and (min-width: 640px) {
		padding: 0.35rem 0.5rem;
	}

	@media screen and (min-width: 720px) {
		padding: 0.35rem 0.5rem;
	}
`;

const Trigger = styled.button`
	padding: 0.6rem 0.75rem;
	border-radius: var(--radius);
	background-color: var(--skeleton-bg-color);

	@media screen and (min-width: 640px) {
		gap: 0.4rem;
		padding: 0.75rem 1.4rem;
	}

	@media screen and (min-width: 720px) {
	}
`;

const YearTrigger = styled(Trigger)`
	width: 130px;
	height: 50px;
`;

const MonthTrigger = styled(Trigger)`
	width: 100px;
	height: 50px;
`;

const SumOfPayment = styled.div`
	width: 240px;
	height: 50px;
`;

export default Skeleton;
