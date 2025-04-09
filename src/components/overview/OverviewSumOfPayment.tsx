import { Badge } from '..';
import { useGetWorkersOverviewQuery } from '../../hooks';
import { formatCurrencyUnit } from '../../utils';

interface OverviewSumOfPayment {
	year: number;
	month: number;
	workerName: string;
}

const OverviewSumOfPayment = ({ year, month, workerName }: OverviewSumOfPayment) => {
	const data = useGetWorkersOverviewQuery({ year, month, workerName });

	return (
		<Badge label={'총 합계'} bgColor={'var(--text-color)'}>
			{formatCurrencyUnit(data?.sumOfPayment)}
		</Badge>
	);
};

export default OverviewSumOfPayment;
