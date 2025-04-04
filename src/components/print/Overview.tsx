import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useGetWorkersOverviewQuery } from '../../hooks/queries';
import { WorkerQuery } from '../../queries/workerQuery';
import { formatCurrencyUnit } from '../../utils';

interface OverviewProps {
	query: WorkerQuery;
}

const OVERVIEW_DIVISOR = 31;

const Overview = ({ query }: OverviewProps) => {
	const {
		state: { year, month },
	} = useLocation() as { state: { year: number; month: number } };

	const workersOverview = useGetWorkersOverviewQuery(query);

	const workersOverviewForPrint =
		(workersOverview?.workers.length ?? 0) <= OVERVIEW_DIVISOR
			? [workersOverview?.workers.slice()]
			: workersOverview?.workers.reduce<(typeof workersOverview.workers)[]>((acc, currEl, idx) => {
					if (idx % OVERVIEW_DIVISOR === 0) acc.push([]);

					acc[acc.length - 1].push(currEl);
					return acc;
			  }, []);

	return (
		<>
			{workersOverviewForPrint?.map((workerOverviewForPrint, arrIdx) => (
				<OverviewTable key={`overviewTable-${arrIdx}`} className="report page-break">
					<thead>
						{arrIdx === 0 && (
							<tr aria-label="tableHead-title">
								<th>{`${year}년 ${month}월 일용직 근로소득 명세서 (민하우징)`}</th>
							</tr>
						)}
						<tr>
							<th aria-label="tableHead-index">번 호</th>
							<th aria-label="tableHead-workerName">성 명</th>
							<th aria-label="tableHead-monthOfWorkedDate">해당 월</th>
							<th aria-label="tableHead-sumOfPayment">금 액</th>
						</tr>
					</thead>
					<tbody>
						{workerOverviewForPrint?.map(({ workerName, workedDate, sumOfPayment }, dataIdx) => (
							<tr key={workerName}>
								<td aria-label="tableBody-index">{arrIdx === 0 ? dataIdx + 1 : dataIdx + 1 + OVERVIEW_DIVISOR}</td>
								<td aria-label="tableBody-workerName">{workerName}</td>
								<td aria-label="tableBody-monthOfWorkedDate">{workedDate.getMonth() + 1}월</td>
								<td aria-label="tableBody-sumOfPayment">{formatCurrencyUnit(sumOfPayment)}</td>
							</tr>
						))}
						<tr key="blank">
							{Array.from({ length: 4 }, (_, idx) => (
								<td key={idx} aria-label="tableBody-blank" />
							))}
						</tr>
						{arrIdx === workersOverviewForPrint.length - 1 && (
							<tr key="sum">
								<td aria-label="tableBody-blank" />
								<td aria-label="tableBody-blank" />
								<td aria-label="tableBody-sum-title">합 계</td>
								<td aria-label="tableBody-total-sumOfPayment">{formatCurrencyUnit(workersOverview?.sumOfPayment)}</td>
							</tr>
						)}
					</tbody>
				</OverviewTable>
			))}
		</>
	);
};

const OverviewTable = styled.table`
	display: flex;
	flex-direction: column;
	margin-top: 16px;
	border: 1px solid #3a3d4a;
	border-collapse: collapse;

	thead > tr,
	tbody > tr {
		display: grid;
		grid-template-columns: 0.5fr 2fr 1.5fr 3fr;
	}

	thead {
		border-top: 1px solid #3a3d4a;
		border-left: 1px solid #3a3d4a;
		border-right: 1px solid #3a3d4a;
	}

	thead > tr[aria-label='tableHead-title'] {
		display: block;
		padding: 8px 0;

		th {
			display: block;
			font-size: 18px;
			text-align: center;
			letter-spacing: 0.05rem;
		}
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
		height: 28px;
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

export default Overview;
