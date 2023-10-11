import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { Button, Flex, HighlightText } from '../components';
import { useGoBack } from '../hooks';
import { useGetWorkersDetailQuery, useGetWorkersQuery } from '../hooks/queries';
import { control } from '../constants/sortControls';
import { formatCurrencyUnit } from '../utils/currencyUnit';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const Print = () => {
	const {
		state: { year, month },
	} = useLocation();

	const goBack = useGoBack();

	const query = { inOrder: control['오래된 순'], year, month, workerName: '' };

	const workersData = useGetWorkersQuery(query);
	const { data: workersDetail } = useGetWorkersDetailQuery(query);

	const printRef = useRef(null);

	//TODO: border 문제 해결 필요 - print

	return (
		<Container>
			<Flex justifyContent="space-between" margin="0 0 2rem 0">
				<GoBackButton type="button" onClick={goBack}>
					<BsArrowLeftCircle size="24" color="var(--text-color)" />
					뒤로가기
				</GoBackButton>
				<Flex gap="1rem">
					<HighlightText color="white" bgColor="black">{`${year}월 ${month}월`}</HighlightText>

					<ReactToPrint trigger={() => <PrintButton type="button">출력하기</PrintButton>} content={() => printRef.current} />
				</Flex>
			</Flex>
			<Data ref={printRef}>
				<OverviewTable className="report page-break">
					<thead>
						<tr aria-label="tableHead-title">
							<th>{`${year}년 ${month}월 일용직 근로소득 명세서 (민하우징)`}</th>
						</tr>
						<tr>
							<th aria-label="tableHead-index">번 호</th>
							<th aria-label="tableHead-workerName">성 명</th>
							<th aria-label="tableHead-monthOfWorkedDate">해당 월</th>
							<th aria-label="tableHead-sumOfPayment">금 액</th>
						</tr>
					</thead>
					<tbody>
						{workersData?.workers.map(({ workerName, workedDate, sumOfPayment }, idx) => (
							<tr key={workerName}>
								<td aria-label="tableBody-index">{idx + 1}</td>
								<td aria-label="tableBody-workerName">{workerName}</td>
								<td aria-label="tableBody-monthOfWorkedDate">{workedDate.getMonth() + 1}월</td>
								<td aria-label="tableBody-sumOfPayment">{formatCurrencyUnit(sumOfPayment)}</td>
							</tr>
						))}
						<tr key="blank">
							<td aria-label="tableBody-blank" />
							<td aria-label="tableBody-blank" />
							<td aria-label="tableBody-blank" />
							<td aria-label="tableBody-blank" />
						</tr>
						<tr key="sum">
							<td aria-label="tableBody-blank" />
							<td aria-label="tableBody-blank" />
							<td aria-label="tableBody-sum-title">합 계</td>
							<td aria-label="tableBody-total-sumOfPayment">{formatCurrencyUnit(workersData?.sumOfPayment)}</td>
						</tr>
					</tbody>
				</OverviewTable>

				<DetailTable className="report page-break">
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
						{workersDetail?.workers.map(
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
								<tr key={id} role="check" onClick={() => {}}>
									<td aria-label="tableBody-index">{isFirstIdxOfArr ? position + 1 : ''}</td>
									<td aria-label="tableBody-workerName">{isFirstIdxOfArr ? workerName : ''}</td>
									<td aria-label="tableBody-registrationNumber">
										{isFirstIdxOfArr ? `${registrationNumberFront} - ${registrationNumberBack}` : ''}
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
					</tbody>
				</DetailTable>
			</Data>
		</Container>
	);
};

const Container = styled.div`
	margin: 1rem auto;
	padding: 3rem 0;

	@media screen and (min-width: 640px) {
		width: 640px;
	}

	@media screen and (min-width: 768px) {
		width: 768px;
	}
`;

const Data = styled.div`
	border-color: var(--color-dark);
`;

const OverviewTable = styled.table`
	display: flex;
	flex-direction: column;
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
		padding: 0.5rem 0;

		th {
			display: block;
			font-size: 18px;
			text-align: center;
			letter-spacing: 0.05rem;
		}
	}

	thead > tr {
		padding: 0.2rem 0;
		border-bottom: 1px solid #3a3d4a;
	}

	tbody {
		border-left: 1px solid #3a3d4a;
		border-right: 1px solid #3a3d4a;
		border-bottom: 1px solid #3a3d4a;
	}

	tbody > tr {
		height: 30px;
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
`;

const DetailTable = styled.table`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	border: 1px solid #3a3d4a;
	border-collapse: collapse;

	thead > tr,
	tbody > tr {
		display: grid;
		grid-template-columns: 0.5fr 1fr 1.5fr 1fr repeat(2, 1.5fr);
		@media screen and (min-width: 640px) {
			/* grid-template-columns: 0.3fr repeat(5, minmax(180px, 1fr)); */
		}
	}

	thead {
		border-top: 1px solid #3a3d4a;
		border-left: 1px solid #3a3d4a;
		border-right: 1px solid #3a3d4a;
	}

	thead > tr {
		padding: 0.2rem 0;
		border-bottom: 1px solid #3a3d4a;
	}

	tbody {
		border-left: 1px solid #3a3d4a;
		border-right: 1px solid #3a3d4a;
		border-bottom: 1px solid #3a3d4a;
	}

	tbody > tr {
		height: 30px;
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
`;

const GoBackButton = styled(Button)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	font-weight: 700;
	color: var(--text-color);
	background-color: #e7e7e9;
	border-radius: 9999px;

	&:hover {
		outline: 2px solid #3a3d4a;
		outline-offset: 2px;
	}
`;

const PrintButton = styled(Button)`
	font-weight: 700;
	color: #fff;
	background-color: var(--color-green-50);
	border-radius: 9999px;

	&:hover {
		background-color: var(--color-green-200);
	}
`;

export default Print;
