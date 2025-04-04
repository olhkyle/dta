import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { DetailsContent, DetailsController, SearchInput, LayoutLoading, DetailsControllerLoader } from '../components';
import { SortOption, monthOfToday, yearOfToday } from '../constants';
import { useDebounce } from '../hooks';

const DetailsPage = () => {
	const [inputValue, setInputValue] = useState('');
	const workerName = useDebounce(inputValue, 500);

	const { state } = useLocation();

	const [year, setYear] = useState(yearOfToday);
	const [month, setMonth] = useState(state ? state?.month + 1 : monthOfToday);
	const [currentSort, setCurrentControl] = useState<SortOption>('asc');

	return (
		<Container>
			<SearchInput value={inputValue} setValue={setInputValue} />
			<Suspense fallback={<DetailsControllerLoader />}>
				<DetailsController
					year={year}
					setYear={setYear}
					month={month}
					setMonth={setMonth}
					workerName={workerName}
					currentSort={currentSort}
					setCurrentControl={setCurrentControl}
				/>
			</Suspense>
			<Suspense fallback={<LayoutLoading />}>
				<DetailsContent year={year} month={month} workerName={workerName} currentSort={currentSort} />
			</Suspense>
		</Container>
	);
};

const Container = styled.section`
	padding: 0 var(--padding-md);
	max-width: 1280px;
	width: 100%;
`;

export default DetailsPage;
