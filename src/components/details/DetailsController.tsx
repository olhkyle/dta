import { Dispatch, SetStateAction, Suspense } from 'react';
import styled from '@emotion/styled';
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
	return (
		<SearchFilters>
			<Flex justifyContent="space-between">
				<Flex gap="16px">
					<Suspense fallback={<DetailsSegmentedControlLoader />}>
						<DetailsSegmentedControl
							year={year}
							month={month}
							workerName={workerName}
							currentSort={currentSort}
							setCurrentControl={setCurrentControl}
						/>
					</Suspense>
					<CustomSelect data={years} value={year} setValue={setYear} unit="년" />
					<CustomSelect
						data={yearOfToday === year ? months.filter(month => month <= monthOfToday) : months}
						value={month}
						setValue={setMonth}
						unit="월"
					/>
				</Flex>
				<Suspense fallback={<DetailsPrintButtonLoader />}>
					<DetailsPrintButton year={year} month={month} workerName={workerName} currentSort={currentSort} />
				</Suspense>
			</Flex>
			<Flex justifyContent="flex-end" margin="36px 0 18px">
				<Suspense fallback={<DetailsSumOfPaymentLoader />}>
					<DetailsSumOfPayment year={year} month={month} workerName={workerName} currentSort={currentSort} />
				</Suspense>
			</Flex>
		</SearchFilters>
	);
};

const SearchFilters = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export default DetailsController;
