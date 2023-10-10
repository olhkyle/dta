import styled from '@emotion/styled';
import { Flex, Loading } from '.';

const Skeleton = () => {
	return (
		<>
			<Container justifyContent="center" gap="1rem" margin="3rem 0">
				<Input className="skeleton-loading" />
			</Container>
			<SearchFilters>
				<Flex margin="2rem 0" gap="1rem">
					<SegmentedControl className="skeleton-loading">
						<Control />
						<Control />
					</SegmentedControl>
					<YearTrigger className="skeleton-loading" />
					<MonthTrigger className="skeleton-loading" />
				</Flex>
				<Flex justifyContent="flex-end" margin="1rem 0">
					<SumOfPayment className="skeleton-loading" />
				</Flex>
			</SearchFilters>
			<Loading />
		</>
	);
};

const Container = styled(Flex)`
	position: relative;
	margin-left: auto;
	margin-right: auto;
	width: 340px;

	@media screen and (min-width: 640px) {
		width: 400px;
	}

	@media screen and (min-width: 768px) {
		width: 600px;
	}
`;

const Input = styled.div`
	position: relative;
	padding: 1rem 1rem;
	width: 300px;
	height: 60px;
	border: none;
	border-radius: 8px;
	background-color: var(--outline-color);
	outline: none;
	overflow: hidden;

	@media screen and (min-width: 640px) {
		padding: 1rem 2rem;
		width: 400px;
	}

	@media screen and (min-width: 768px) {
		width: 600px;
	}
`;

const SearchFilters = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media screen and (min-width: 640px) {
		flex-direction: row;
		justify-content: space-between;
	}
`;

const SegmentedControl = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
	padding: 0.25rem;
	width: 180px;
	height: 50px;
	background-color: var(--outline-color);
	border-radius: var(--radius);

	@media screen and (min-width: 640px) {
		padding: 0.5rem;
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
	background-color: var(--outline-color);

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
