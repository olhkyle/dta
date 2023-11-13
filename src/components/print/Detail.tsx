import styled from '@emotion/styled';
import { useGetWorkersDetailQuery } from '../../hooks/queries';
import { WorkerQuery } from '../../queries/workerQuery';
import { WorkersDetailBySort } from '../../service/workData';
import { useAppSelector } from '../../store/store';
import { getIsAdmin } from '../../store/userSlice';
import { formatCurrencyUnit } from '../../utils/currencyUnit';

interface DetailProps {
	query: WorkerQuery;
}

const DETAIL_DIVISOR = 30;

const Detail = ({ query }: DetailProps) => {
	const { data: workersDetail } = useGetWorkersDetailQuery(query);
	const isAdmin = useAppSelector(getIsAdmin);

	const workersDetailForPrint =
		(workersDetail?.workers.length ?? 0) <= DETAIL_DIVISOR
			? [workersDetail?.workers.slice()]
			: workersDetail?.workers.reduce((acc, currEl, idx) => {
					if (idx % DETAIL_DIVISOR === 0) acc.push([]);

					acc[acc.length - 1].push(currEl);
					return acc;
			  }, [] as WorkersDetailBySort[]);

	return (
		<>
			{workersDetailForPrint?.map((workerDetailForPrint, idx) => (
				<DetailTable key={`detailTable-${idx}`} className="report page-break">
					<thead>
						<tr>
							<th aria-label="tableHead-index">번 호</th>
							<th aria-label="tableHead-workerName">성 명</th>
							<th aria-label="tableHead-registrationNumber">주민등록번호</th>
							<th aria-label="tableHead-workedDate">출력일</th>
							<th aria-label="tableHead-payment">지급액</th>
							<th aria-label="tableHead-remittance">송금내용</th>
						</tr>
					</thead>
					<tbody>
						{workerDetailForPrint?.map(
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
								<tr key={id} role="check">
									<td aria-label="tableBody-index">{isFirstIdxOfArr ? position + 1 : ''}</td>
									<td aria-label="tableBody-workerName">{isFirstIdxOfArr ? workerName : ''}</td>
									<td aria-label="tableBody-registrationNumber">
										{isAdmin ? (
											isFirstIdxOfArr ? (
												`${registrationNumberFront} - ${registrationNumberBack}`
											) : (
												''
											)
										) : (
											<span aria-label="isNotAdmin">Classified</span>
										)}
									</td>
									<td aria-label="tableBody-workedDate">
										{workedDate.getMonth() + 1}/{workedDate.getDate()}
									</td>
									<td aria-label="tableBody-payment">{formatCurrencyUnit(Number(payment))}</td>
									<td aria-label="tableBody-remittance">
										{remittanceType}: {formatCurrencyUnit(Number(remittance))}
									</td>
								</tr>
							),
						)}
						{idx === workersDetailForPrint.length - 1 && (
							<>
								<tr aria-label="blank">
									{Array.from({ length: 6 }, (_, idx) => (
										<td key={idx} aria-label="tableBody-blank" />
									))}
								</tr>
								<tr aria-label="sum">
									{Array.from({ length: 3 }, (_, idx) => (
										<td key={idx} aria-label="tableBody-blank" />
									))}
									<td aria-label="tableBody-sum-title">합 계</td>
									<td aria-label="tableBody-total-sumOfPayment">{formatCurrencyUnit(workersDetail?.sumOfPayment)}</td>
									<td aria-label="tableBody-blank" />
								</tr>
							</>
						)}
					</tbody>
				</DetailTable>
			))}
		</>
	);
};

const DetailTable = styled.table`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	border: 1px solid #3a3d4a;
	border-collapse: collapse;

	thead > tr,
	tbody > tr {
		display: grid;
		grid-template-columns: 0.5fr 1fr 1.5fr 1fr 1.5fr 2fr;
	}

	thead {
		border-top: 1px solid #3a3d4a;
		border-left: 1px solid #3a3d4a;
		border-right: 1px solid #3a3d4a;
	}

	thead > tr {
		padding: 0.3rem 0;
		border-bottom: 1px solid #3a3d4a;
	}

	tbody {
		border-left: 1px solid #3a3d4a;
		border-right: 1px solid #3a3d4a;
		border-bottom: 1px solid #3a3d4a;
	}

	tbody > tr {
		height: 32px;
		border-bottom: 1px solid #3a3d4a;

		&:last-child {
			border-bottom: none;
		}
	}

	th,
	td {
		border-left: 1px solid #3a3d4a;

		&:first-of-type {
			border-left: none;
		}
	}

	th {
		font-size: 15px;
	}

	td {
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 13.3px;
	}

	td[aria-label='tableBody-sum-title'],
	td[aria-label='tableBody-total-sumOfPayment'] {
		font-weight: 600;
	}
`;

export default Detail;
