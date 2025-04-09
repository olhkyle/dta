import { Dispatch, SetStateAction, Suspense } from 'react';
import {
	CustomSelect,
	DetailsSegmentedControl,
	DetailsPrintButton,
	DetailsPrintButtonLoader,
	DetailsSegmentedControlLoader,
	DetailsSumOfPayment,
	DetailsSumOfPaymentLoader,
	Flex,
} from '..';
import { monthOfToday, months, SortOption, yearOfToday, years } from '../../constants';

interface DetailsControllerProps {
	year: number;
	setYear: Dispatch<SetStateAction<number>>;
	month: number;
	setMonth: Dispatch<SetStateAction<number>>;
	workerName: string;
	currentSort: SortOption;
	setCurrentControl: Dispatch<SetStateAction<SortOption>>;
}

const DetailsController = ({ year, setYear, month, setMonth, workerName, currentSort, setCurrentControl }: DetailsControllerProps) => {
	console.log(months.filter(month => month <= monthOfToday));
	console.log(months);
	return (
		<Flex direction={'column'} justifyContent={'space-between'} alignItems={'flex-start'} width={'100%'}>
			<Flex justifyContent={'space-between'} width={'100%'}>
				<Flex gap={'16px'}>
					<Suspense fallback={<DetailsSegmentedControlLoader />}>
						<DetailsSegmentedControl
							year={year}
							month={month}
							workerName={workerName}
							currentSort={currentSort}
							setCurrentControl={setCurrentControl}
						/>
					</Suspense>
					<CustomSelect data={years} value={year} setValue={setYear} unit={'년'} />
					<CustomSelect
						data={yearOfToday === year ? months.filter(month => month <= monthOfToday) : months}
						value={yearOfToday === year && month > monthOfToday ? monthOfToday : month}
						setValue={setMonth}
						unit={'월'}
					/>
				</Flex>
				<Suspense fallback={<DetailsPrintButtonLoader />}>
					<DetailsPrintButton year={year} month={month} workerName={workerName} currentSort={currentSort} />
				</Suspense>
			</Flex>
			<Flex justifyContent={'flex-end'} margin={'36px 0 18px'} width={'100%'}>
				<Suspense fallback={<DetailsSumOfPaymentLoader />}>
					<DetailsSumOfPayment year={year} month={month} workerName={workerName} currentSort={currentSort} />
				</Suspense>
			</Flex>
		</Flex>
	);
};

export default DetailsController;
