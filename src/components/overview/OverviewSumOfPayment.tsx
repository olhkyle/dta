import { Badge } from '..';
import { useGetWorkersOverviewQuery } from '../../hooks';
import { useAppSelector } from '../../store/store';
import { getIsAdmin } from '../../store/userSlice';
import { formatCurrencyUnit } from '../../utils';

interface OverviewSumOfPayment {
	year: number;
	month: number;
	workerName: string;
}

const OverviewSumOfPayment = ({ year, month, workerName }: OverviewSumOfPayment) => {
	const data = useGetWorkersOverviewQuery({ year, month, workerName });
	const isAdmin = useAppSelector(getIsAdmin);

	return (
		<Badge label={'총 합계'} bgColor={'var(--text-color)'}>
			{isAdmin ? formatCurrencyUnit(data?.sumOfPayment) : '﹡﹡﹡﹡﹡﹡'}
		</Badge>
	);
};

export default OverviewSumOfPayment;
