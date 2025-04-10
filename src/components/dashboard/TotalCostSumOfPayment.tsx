import { useQuery } from '@tanstack/react-query';
import { FaWonSign } from 'react-icons/fa';
import { Content } from '.';
import { queryKey } from '../../constants';
import { getWorkersOverviewByYear } from '../../service/workData';
import { formatCurrencyUnit } from '../../utils';
import { WorkerQuery } from '../../queries';

interface TotalCostSumOfPaymentProps {
	year: WorkerQuery['year'];
}

const TotalCostSumOfPayment = ({ year }: TotalCostSumOfPaymentProps) => {
	const { data } = useQuery({
		queryKey: [...queryKey.WORKERS_OVERVIEW_DASHBOARD, year],
		queryFn: () => getWorkersOverviewByYear({ year }),
	});

	return (
		<Content>
			<FaWonSign size="32" color="var(--text-color)" />
			<div>{formatCurrencyUnit(data?.sumOfPayment)}</div>
		</Content>
	);
};

export default TotalCostSumOfPayment;
