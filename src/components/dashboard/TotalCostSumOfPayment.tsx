import { FaWonSign } from 'react-icons/fa';
import { Content } from '.';
import { WorkersOverviewDashboardData } from '../../service/workData';
import { formatCurrencyUnit } from '../../utils';
import { useMediaQuery } from '../../hooks';
import { useAppSelector } from '../../store/store';
import { getIsAdmin } from '../../store/userSlice';

interface TotalCostSumOfPaymentProps {
	data?: WorkersOverviewDashboardData;
}

const TotalCostSumOfPayment = ({ data }: TotalCostSumOfPaymentProps) => {
	const isMobile = useMediaQuery('(max-width: 640px)');
	const isAdmin = useAppSelector(getIsAdmin);

	return (
		<Content>
			<FaWonSign size={isMobile ? '24' : '32'} color="var(--text-color)" />
			<div>{isAdmin ? formatCurrencyUnit(data?.sumOfPayment) : 'Classified'}</div>
		</Content>
	);
};

export default TotalCostSumOfPayment;
