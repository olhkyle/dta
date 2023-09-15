import { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { BsTrash } from 'react-icons/bs';
import { useDebounce } from '../hooks';
import { getWorkersDetailQuery } from '../queries';
import { control } from '../queries/getWorkersQuery';
import { Badge, Button, CustomSelect, EmptyIndicator, Flex, HighlightText, Loading, SearchInput, SegmentedControl } from '../components';
import { monthOfToday, months, yearOfToday, years } from '../constants/day';
import controls from '../constants/sortControls';
import { formatCurrencyUnit } from '../utils/currencyUnit';

const Details = () => {
	const [inputValue, setInputValue] = useState('');
	const workerName = useDebounce(inputValue, 500);

	const [year, setYear] = useState(yearOfToday);
	const [month, setMonth] = useState(monthOfToday);
	const [currentSort, setCurrentControl] = useState(controls[0]);

	const { data, isLoading } = useQuery(getWorkersDetailQuery({ inOrder: control[currentSort], year, month, workerName }));

	return (
		<>
			<SearchInput value={inputValue} setValue={setInputValue} />
			<SearchFilters>
				<Flex justifyContent="space-between">
					<Flex margin="1rem 0" gap="1rem">
						<SegmentedControl data={controls} value={currentSort} setValue={setCurrentControl} />
						<CustomSelect data={years} value={year} setValue={setYear} unit="년" width={120} />
						<CustomSelect data={months} value={month} setValue={setMonth} unit="월" width={120} />
					</Flex>
					<PrintButton type="button">출력</PrintButton>
				</Flex>
				<Flex justifyContent="flex-end" margin="2rem 0">
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
				<Table searched={workerName.length > 0}>
					<thead>
						<tr>
							<th aria-label="index">번 호</th>
							<th aria-label="workerName">성 명</th>
							<th aria-label="registrationNumber">주민등록번호</th>
							<th aria-label="workedDate">출력일</th>
							<th aria-label="payment">
								지급액<span>(원)</span>
							</th>
							<th aria-label="remittance">
								송금내용<span>(유형 + 금액)</span>
							</th>
						</tr>
					</thead>

					<tbody>
						{data?.workers.map(
							({
								position,
								isFirstIdxOfArr,
								id,
								workerName,
								registrationNumberFront,
								registrationNumberBack,
								workedDate,
								payment,
								remittance,
								remittanceType,
							}) => (
								<tr key={id}>
									<td aria-label="index">{isFirstIdxOfArr ? position + 1 : ''}</td>
									<td aria-label="workerName">{workerName}</td>
									<td aria-label="registrationNumber">{`${registrationNumberFront} - ${registrationNumberBack}`}</td>
									<td aria-label="workedDate">
										{workedDate.getMonth() + 1}/{workedDate.getDate()}
									</td>
									<td aria-label="payment">{formatCurrencyUnit(Number(payment))}</td>
									<td aria-label="remittance">
										<HighlightText color="var(--text-color)" bgColor="var(--outline-color)">
											{remittanceType}
										</HighlightText>
										{' - '}
										{formatCurrencyUnit(Number(remittance))}
									</td>
								</tr>
							),
						)}
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
`;

const PrintButton = styled(Button)`
	display: none;
	font-size: 15px;
	padding: 0.6rem 1.5rem;
	background-color: var(--color-green-50);
	color: var(--bg-color);

	&:hover {
		background-color: var(--color-green-200);
	}

	@media screen and (min-width: 640px) {
		display: inline-block;
		padding: 0.6rem 2rem;
		font-size: 21px;
	}
`;

const Table = styled.table<{ searched: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	margin-top: 2rem;
	width: 100%;
	text-align: center;

	thead > tr,
	tbody > tr {
		display: grid;
		grid-template-columns: 0.75fr 1.5fr 2.5fr 1.5fr 3fr;

		@media screen and (min-width: 640px) {
			grid-template-columns: 0.75fr 1.5fr 2.5fr 1.5fr 2fr 3fr;
		}
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
		font-size: 18px;

		span {
			font-size: 16px;
		}

		@media screen and (min-width: 640px) {
			font-size: 18px;
		}

		@media screen and (min-width: 720px) {
			font-size: 20px;
		}
	}

	th[aria-label='payment'] {
		display: none;

		@media screen and (min-width: 640px) {
			display: inline-block;
		}
	}

	td {
		font-size: 18px;
	}

	td[aria-label='workerName'],
	td[aria-label='payment'] {
		font-weight: ${({ searched }) => (searched ? '900' : '400')};
		color: ${({ searched }) => (searched ? 'var(--color-green-300)' : 'var(--text-color)')};
		border-radius: 8px;
	}

	td[aria-label='payment'] {
		display: none;

		@media screen and (min-width: 640px) {
			display: inline-block;
		}
	}
`;

export default Details;
