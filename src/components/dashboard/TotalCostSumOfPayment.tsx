import { FaWonSign } from 'react-icons/fa';
import { Content } from '.';
import { WorkersOverviewDashboardData } from '../../service/workData';
import { formatCurrencyUnit } from '../../utils';
import { useMediaQuery } from '../../hooks';

interface TotalCostSumOfPaymentProps {
	data?: WorkersOverviewDashboardData;
}

const TotalCostSumOfPayment = ({ data }: TotalCostSumOfPaymentProps) => {
	const isMobile = useMediaQuery('(max-width: 640px)');

	return (
		<Content>
			<FaWonSign size={isMobile ? '24' : '32'} color="var(--text-color)" />
			<div>{formatCurrencyUnit(data?.sumOfPayment)}</div>
		</Content>
	);
};

export default TotalCostSumOfPayment;
