import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDebounce, useInfiniteScroll, useGetWorkersDetailInfiniteQuery } from '../hooks';
import {
	Badge,
	Button,
	CustomSelect,
	EmptyIndicator,
	Flex,
	HighlightText,
	Loading,
	SearchInput,
	SegmentedControl,
	DetailModal,
} from '../components';
import routes from '../constants/routes';
import { WorkerWithId, sortByNameAndWorkedDate } from '../service/workData';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getIsAdmin } from '../store/userSlice';
import { open } from '../store/modalSlice';
import { formatCurrencyUnit } from '../utils/currencyUnit';
import { control, controls } from '../constants/sortControls';
import { monthOfToday, months, yearOfToday, years } from '../constants/day';

const Details = () => {
	const [inputValue, setInputValue] = useState('');
	const workerName = useDebounce(inputValue, 500);

	const { state } = useLocation();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const isAdmin = useAppSelector(getIsAdmin);

	const [year, setYear] = useState(yearOfToday);
	const [month, setMonth] = useState(state ? state?.month + 1 : monthOfToday);
	const [currentSort, setCurrentControl] = useState(controls[0]);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useGetWorkersDetailInfiniteQuery({
		inOrder: control[currentSort],
		year,
		month,
		workerName,
	});

	const ref = useInfiniteScroll(fetchNextPage);

	const workers = sortByNameAndWorkedDate(data?.pages.map(({ paginationData }) => paginationData.data).flat() ?? [], control[currentSort]);
	const openModal = (data: WorkerWithId) => dispatch(open({ Component: DetailModal, props: { data, isOpen: true, refetch } }));

	return (
		<>
			<SearchInput value={inputValue} setValue={setInputValue} />
			<SearchFilters>
				<Flex justifyContent="space-between">
					<Flex margin="2rem 0 1rem" gap="1rem">
						<SegmentedControl data={controls} value={currentSort} setValue={setCurrentControl} />
						<CustomSelect data={years} value={year} setValue={setYear} unit="년" width={120} />
						<CustomSelect data={months} value={month} setValue={setMonth} unit="월" width={120} />
					</Flex>
					<PrintButton
						type="button"
						onClick={() => {
							if (workers?.length === 0) {
								toast.warn('해당 월의 출력 대상자가 없습니다.');
								return;
							}

							navigate(routes.PRINT, { state: { year, month } });
						}}
						aria-label="print-button">
						인 쇄
					</PrintButton>
				</Flex>
				<Flex justifyContent="flex-end" margin="3rem 0 2rem">
					<Badge label="총 합계" bgColor="var(--text-color)">
						{formatCurrencyUnit(data?.pages[0].totalPayment)}
					</Badge>
				</Flex>
			</SearchFilters>
			<Suspense fallback={<Loading />}>
				{workers?.length === 0 ? (
					<EmptyIndicator>
						<p>해당 일용직이 없습니다</p>
						<BsTrash size="21" />
					</EmptyIndicator>
				) : (
					<Table searched={workerName.length > 0}>
						<thead>
							<tr>
								<th aria-label="tableHead-index">#</th>
								<th aria-label="tableHead-workerName">성 명</th>
								<th aria-label="tableHead-registrationNumber">주민번호</th>
								<th aria-label="tableHead-workedDate">출력일</th>
								<th aria-label="tableHead-payment">
									지급액<span>(원)</span>
								</th>
								<th aria-label="tableHead-remittance">
									송금내용<span>(유형 + 금액)</span>
								</th>
							</tr>
						</thead>

						<tbody>
							{workers.map(
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
									memo,
								}) => (
									<tr
										key={id}
										role="check"
										onClick={() =>
											openModal({
												id,
												workerName,
												registrationNumberFront,
												registrationNumberBack,
												workedDate,
												payment,
												remittance,
												remittanceType,
												memo,
											})
										}>
										<td aria-label="tableBody-index">{isFirstIdxOfArr ? position + 1 : ''}</td>
										<td aria-label="tableBody-workerName">{workerName}</td>
										<td aria-label="tableBody-registrationNumber">
											{isAdmin ? `${registrationNumberFront} - ${registrationNumberBack}` : <span aria-label="isNotAdmin">Classified</span>}
										</td>
										<td aria-label="tableBody-workedDate">
											{workedDate.getMonth() + 1}/{workedDate.getDate()}
										</td>
										<td aria-label="tableBody-payment">{formatCurrencyUnit(Number(payment))}</td>
										<td aria-label="tableBody-remittance">
											<HighlightText color="var(--text-color)" bgColor="var(--outline-color)">
												{remittanceType}
											</HighlightText>
											{formatCurrencyUnit(Number(remittance))}
										</td>
									</tr>
								),
							)}
						</tbody>
					</Table>
				)}
			</Suspense>
			<div ref={ref}>{hasNextPage && isFetchingNextPage && <Loading type="sm" size={40} />}</div>
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
	margin: 2rem 0 1rem;
	padding: 0.6rem 1.5rem;
	font-size: 15px;
	background-color: var(--color-green-300);
	color: var(--color-white);
	outline-offset: 1px;
	border-radius: 12px;
	transition: all 0.3s ease-in-out 0.15s;

	&:hover {
		background-color: var(--color-green-200);
		outline: 3px solid var(--outline-color);
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
	margin: 2rem auto 6rem;
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
		padding: 1rem 0;
	}

	thead > tr {
		border-bottom: 1px solid var(--color-gray-500);
	}

	tbody > tr {
		border-top: 1px solid var(--outline-color);
		border-bottom: 1px solid var(--outline-color);

		&:nth-of-type(1) {
			border-top-color: var(--bg-color);
		}
	}

	tbody > tr:hover {
		border-top: 1px solid var(--color-green-50);
		border-bottom: 1px solid var(--color-green-50);
		background-color: var(--option-hover-bg-color);
		cursor: pointer;
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

	th[aria-label='tableHead-payment'] {
		display: none;

		@media screen and (min-width: 640px) {
			display: inline-block;
		}
	}

	th[aria-label='tableHead-remittance'] {
		span {
			display: none;
			@media screen and (min-width: 640px) {
				display: inline-block;
			}
		}
	}

	td {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
	}

	td[aria-label='tableBody-workerName'],
	td[aria-label='tableBody-payment'] {
		font-weight: ${({ searched }) => (searched ? '900' : '400')};
		color: ${({ searched }) => (searched ? 'var(--color-green-300)' : 'var(--text-color)')};
		border-radius: 8px;
	}

	td[aria-label='tableBody-payment'] {
		display: none;

		@media screen and (min-width: 640px) {
			display: inline-flex;
		}
	}

	td[aria-label='tableBody-remittance'] {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
		margin: 0 auto;

		@media screen and (min-width: 640px) {
			flex-direction: row;
			gap: 0.4rem;
		}
	}

	td[aria-label='tableBody-registrationNumber'] > span {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 0.25rem 0.5rem;
		font-size: 13px;
		backdrop-filter: blur(4px);
		color: var(--color-gray-600);
		background-color: var(--color-gray-400);
		border: 1px solid var(--outline-color);
		border-radius: 12px;
	}
`;

export default Details;
