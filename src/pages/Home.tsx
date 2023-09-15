import { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { BsTrash } from 'react-icons/bs';
import { getWorkersQuery } from '../queries';
import { control } from '../queries/getWorkersQuery';
import { useDebounce } from '../hooks';
import { Badge, CustomSelect, EmptyIndicator, Flex, Loading, SearchInput, SegmentedControl } from '../components';
import { formatCurrencyUnit } from '../utils/currencyUnit';
import { monthOfToday, months, yearOfToday, years } from '../constants/day';
import controls from '../constants/sortControls';

const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const workerName = useDebounce(inputValue, 500);
	const [year, setYear] = useState(yearOfToday);
	const [month, setMonth] = useState(monthOfToday);
	const [currentPosition, setCurrentPosition] = useState(controls[0]);

	const { data, isLoading } = useQuery(getWorkersQuery({ inOrder: control[currentPosition], year, month, workerName }));

	return (
		<>
			<SearchInput value={inputValue} setValue={setInputValue} />
			<SearchFilters>
				<Flex margin="2rem 0" gap="1rem">
					<SegmentedControl data={controls} value={currentPosition} setValue={setCurrentPosition} />
					<CustomSelect data={years} value={year} setValue={setYear} unit="년" width={120} />
					<CustomSelect data={months} value={month} setValue={setMonth} unit="월" width={120} />
				</Flex>
				<Flex justifyContent="flex-end" margin="1rem 0">
					<Badge label="총 합계" bgColor="var(--text-color)">
						{formatCurrencyUnit(data?.sumOfPayment)}
					</Badge>
				</Flex>
			</SearchFilters>

			{isLoading ? (
				<Loading />
			) : data?.workers.length === 0 ? (
				<EmptyIndicator>
					<p>해당 일용직이 없습니다</p>
					<BsTrash size="24" />
				</EmptyIndicator>
			) : (
				<Table>
					<thead>
						<tr>
							<th>번 호</th>
							<th>성 명</th>
							<th>해당 월</th>
							<th>
								금 액<span>(원)</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.workers.map(({ workerName, workedDate, sumOfPayment }, idx) => (
							<tr key={workerName}>
								<td>{idx + 1}</td>
								<td>{workerName}</td>
								<td>{workedDate.getMonth() + 1}월</td>
								<td>{formatCurrencyUnit(sumOfPayment)}</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

const SearchFilters = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media screen and (min-width: 640px) {
		flex-direction: row;
		justify-content: space-between;
	}
`;

const Table = styled.table`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	margin-top: 2rem;
	width: 100%;
	text-align: center;

	thead > tr,
	tbody > tr {
		display: grid;
		grid-template-columns: 1fr 2fr 1.5fr 3fr;
	}

	tr {
		padding: 0.5rem 0;
	}

	thead > tr {
		border-bottom: 1px solid var(--color-gray-500);
	}

	tbody > tr {
		border-bottom: 1px solid var(--outline-color);
	}

	tbody {
		display: grid;
		gap: 0.8rem;
	}

	th {
		font-size: 20px;

		span {
			font-size: 16px;
		}
	}

	td {
		font-size: 18px;
	}
`;

export default Home;
