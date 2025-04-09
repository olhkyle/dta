import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { LayoutLoading, OverviewControllerLoader, SearchInput } from '../components';
import { useDebounce } from '../hooks';
import { type DisplayValues, monthOfToday, yearOfToday, SortOption, displayType } from '../constants';
import { OverviewContent, OverviewController } from '../components';

const OverViewPage = () => {
	const [inputValue, setInputValue] = useState('');
	const workerName = useDebounce(inputValue, 500);

	const [year, setYear] = useState(yearOfToday);
	const [month, setMonth] = useState(monthOfToday);
	const [currentSort, setCurrentSort] = useState<SortOption>('asc');
	const [currentDisplayType, setCurrentDisplayType] = useState<DisplayValues>(displayType.LIST);

	return (
		<Container>
			<SearchInput value={inputValue} setValue={setInputValue} />
			<Suspense fallback={<OverviewControllerLoader />}>
				<OverviewController
					year={year}
					setYear={setYear}
					month={month}
					setMonth={setMonth}
					workerName={workerName}
					currentSort={currentSort}
					setCurrentSort={setCurrentSort}
					currentDisplayType={currentDisplayType}
					setCurrentDisplayType={setCurrentDisplayType}
				/>
			</Suspense>

			<Suspense fallback={<LayoutLoading />}>
				<OverviewContent
					year={year}
					month={month}
					workerName={workerName}
					currentSort={currentSort}
					currentDisplayType={currentDisplayType}
				/>
			</Suspense>
		</Container>
	);
};

const Container = styled.section`
	padding: 0 var(--padding-md);
	max-width: 1280px;
	width: 100%;
`;

export default OverViewPage;
