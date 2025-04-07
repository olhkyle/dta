import styled from '@emotion/styled';
import { BsBoxSeam } from 'react-icons/bs';
import { DetailModal, EmptyIndicator, SmallLoading } from '..';
import { SortOption } from '../../constants';
import { useGetWorkersDetailInfiniteQuery, useInfiniteScroll } from '../../hooks';
import { sortByNameAndWorkedDate, WorkerWithId } from '../../service/workData';
import { formatCurrencyUnit } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { open } from '../../store/modalSlice';
import { getIsAdmin } from '../../store/userSlice';

interface DetailsContentProps {
	year: number;
	month: number;
	workerName: string;
	currentSort: SortOption;
}

const DetailsContent = ({ year, month, workerName, currentSort }: DetailsContentProps) => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetWorkersDetailInfiniteQuery({
		inOrder: currentSort,
		year,
		month,
		workerName,
	});

	const dispatch = useAppDispatch();
	const isAdmin = useAppSelector(getIsAdmin);
	const ref = useInfiniteScroll(fetchNextPage);

	const workers = sortByNameAndWorkedDate(data?.pages.map(({ paginationData }) => paginationData.data).flat() ?? [], currentSort);

	const openModal = (data: WorkerWithId) =>
		dispatch(
			open({
				Component: DetailModal,
				props: { data: { worker: data, currentSort, date: `${year}-${month}`, workerName }, isOpen: true },
			}),
		);

	return (
		<>
			{workers?.length === 0 ? (
				<EmptyIndicator>
					<BsBoxSeam size={60} color="var(--color-gray-500)" />
					<p>해당 월에는 작업한 일용직이 없습니다</p>
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
							<th aria-label="tableHead-workspace">근로지역</th>
							<th aria-label="tableHead-businessNumber">사업개시번호</th>
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
								workspace,
								businessNumber,
								remittanceType,
								payment,
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
											workspace,
											businessNumber,
											remittanceType,
											payment,
											memo,
										})
									}>
									<td aria-label="tableBody-index">
										<span>{isFirstIdxOfArr ? position + 1 : ''}</span>
									</td>
									<td aria-label="tableBody-workerName">{workerName}</td>
									<td aria-label="tableBody-registrationNumber">
										{isAdmin ? `${registrationNumberFront} - ${registrationNumberBack}` : <span aria-label="isNotAdmin">Classified</span>}
									</td>
									<td aria-label="tableBody-workedDate">
										{workedDate.getMonth() + 1}/{workedDate.getDate()}
									</td>
									<td aria-label="tableBody-payment">{formatCurrencyUnit(Number(payment))}</td>

									<td aria-label="tableBody-workspace">{workspace ?? '해당 없음'}</td>
									<td aria-label="tableBody-businessNumber">
										{isAdmin ? businessNumber ?? '해당 없음' : <span aria-label="isNotAdmin">Classified</span>}
									</td>
								</tr>
							),
						)}
					</tbody>
				</Table>
			)}
			<div ref={ref}>{hasNextPage && isFetchingNextPage && <SmallLoading />}</div>
		</>
	);
};

const Table = styled.table<{ searched: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	margin: 32px auto 96px;
	width: 100%;
	text-align: center;
	border: 1px solid var(--color-gray-300);
	border-radius: var(--radius);

	thead > tr,
	tbody > tr {
		display: grid;
		grid-template-columns: 0.5fr 1.5fr 1fr 2fr 3fr;

		@media screen and (min-width: 640px) {
			grid-template-columns: 0.75fr 1.5fr 2.5fr 1fr 1.5fr 1.5fr 2fr;
		}
	}

	tr {
		padding: 16px 0;
	}

	thead > tr {
		border-bottom: 1px solid var(--color-gray-300);
	}

	tbody > tr {
		border-top: 1px solid var(--outline-color);
		border-bottom: 1px solid var(--outline-color);
		transition: all 0.15s ease-out;

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
		font-size: var(--fz-rp);

		span {
			font-size: var(--fz-m);
		}

		@media screen and (min-width: 640px) {
			font-size: var(--fz-rp);
		}

		@media screen and (min-width: 720px) {
			font-size: var(--fz-h7);
		}
	}

	th[aria-label='tableHead-payment'] {
		display: none;

		@media screen and (min-width: 640px) {
			display: inline-block;
		}
	}

	th[aria-label='tableHead-registrationNumber'] {
		display: none;

		@media screen and (min-width: 640px) {
			display: inline-block;
		}
	}

	td {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: var(--fz-m);

		@media screen and (min-width: 520px) {
			font-size: var(--fz-rp);
		}

		@media screen and (min-width: 640px) {
			font-size: var(--fz-rp);
		}
	}

	td[aria-label='tableBody-index'] > span {
		display: inline-block;
		width: 24px;
		color: var(--color-gray-800);
		background-color: var(--color-gray-100);
		border: 1px solid var(--color-gray-opacity-200);
		border-radius: calc(var(--radius) * 0.5);
	}

	td[aria-label='tableBody-workerName'],
	td[aria-label='tableBody-payment'] {
		font-weight: ${({ searched }) => (searched ? 'var(--fw-black)' : 'var(--fw-regular)')};
		color: ${({ searched }) => (searched ? 'var(--color-green-300)' : 'var(--text-color)')};
		border-radius: var(--radius);
	}

	td[aria-label='tableBody-payment'] {
		display: none;

		@media screen and (min-width: 640px) {
			display: inline-flex;
		}
	}

	td[aria-label='tableBody-registrationNumber'] {
		display: none;

		@media screen and (min-width: 640px) {
			display: inline-flex;
		}
	}

	td[aria-label='tableBody-registrationNumber'] > span {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: calc(var(--padding-sm) * 0.5) var(--padding-sm);
		font-size: var(--fz-sm);
		backdrop-filter: blur(4px);
		color: var(--color-gray-600);
		background-color: var(--color-gray-400);
		border: 1px solid var(--outline-color);
		border-radius: calc(var(--radius) * 1.5);
	}

	@media screen and (max-width: 640px) {
		border-color: var(--color-white);
	}
`;

export default DetailsContent;
