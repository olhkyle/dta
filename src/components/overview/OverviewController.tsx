import { Dispatch, SetStateAction, Suspense } from 'react';
import styled from '@emotion/styled';
import {
	CustomSelect,
	Flex,
	SegmentedControl,
	OverviewSegmentedControl,
	OverviewSumOfPayment,
	OverviewSegmentedControlLoader,
	OverviewSumOfPaymentLoader,
} from '..';
import { displayType, type DisplayValues, monthOfToday, months, SortOption, yearOfToday, years } from '../../constants';

interface OverviewControllerProps {
	year: number;
	setYear: Dispatch<SetStateAction<number>>;
	month: number;
	setMonth: Dispatch<SetStateAction<number>>;
	workerName: string;
	currentSort: SortOption;
	setCurrentSort: Dispatch<SetStateAction<SortOption>>;
	currentDisplayType: DisplayValues;
	setCurrentDisplayType: Dispatch<SetStateAction<DisplayValues>>;
}

const OverviewController = ({
	year,
	setYear,
	month,
	setMonth,
	workerName,
	currentSort,
	setCurrentSort,
	currentDisplayType,
	setCurrentDisplayType,
}: OverviewControllerProps) => {
	return (
		<CustomFlex margin={'32px 0'} gap={'16px'}>
			<SegmentedControl data={Object.values(displayType)} value={currentDisplayType} setValue={setCurrentDisplayType} />
			<SearchFilters direction={'column'} justifyContent={'space-between'} gap={'16px'} width={'100%'}>
				<Flex gap={'16px'} alignItems={'center'} margin={'0 auto 0 0'}>
					<Suspense fallback={<OverviewSegmentedControlLoader />}>
						<OverviewSegmentedControl
							year={year}
							month={month}
							workerName={workerName}
							currentSort={currentSort}
							setCurrentSort={setCurrentSort}
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
				<Flex justifyContent={'flex-end'} margin={'16px 0 0 auto'}>
					<Suspense fallback={<OverviewSumOfPaymentLoader />}>
						<OverviewSumOfPayment year={year} month={month} workerName={workerName} />
					</Suspense>
				</Flex>
			</SearchFilters>
		</CustomFlex>
	);
};

const CustomFlex = styled(Flex)`
	@media screen and (max-width: 1024px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const SearchFilters = styled(Flex)`
	@media screen and (min-width: 640px) {
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}
`;

export default OverviewController;
