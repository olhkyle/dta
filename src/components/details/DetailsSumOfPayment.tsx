import { Badge } from '..';
import { formatCurrencyUnit } from '../../utils';
import { useGetWorkersDetailInfiniteQuery } from '../../hooks';
import { SortOption } from '../../constants';

interface DetailsSumOfPaymentProps {
	year: number;
	month: number;
	workerName: string;
	currentSort: SortOption;
}

const DetailsSumOfPayment = ({ year, month, workerName, currentSort }: DetailsSumOfPaymentProps) => {
	const { data } = useGetWorkersDetailInfiniteQuery({
		inOrder: currentSort,
		year,
		month,
		workerName,
	});

	return (
		<Badge label="총 합계" bgColor="var(--text-color)">
			{formatCurrencyUnit(data?.pages[0].totalPayment)}
		</Badge>
	);
};

export default DetailsSumOfPayment;
