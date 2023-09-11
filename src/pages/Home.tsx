import { useQuery } from '@tanstack/react-query';
import { getWorkersQuery } from '../queries';
import styled from '@emotion/styled';
import { formatCurrencyUnit } from '../utils/currencyUnit';
import { Text } from '../components';

const Home = () => {
	const { data } = useQuery(getWorkersQuery());

	return (
		<>
			<Text typo="h5" color="var(--text-color)">
				총 합계 : {formatCurrencyUnit(data?.sumOfPayment)}
			</Text>

			<br />

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
		</>
	);
};

const Table = styled.table`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
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
