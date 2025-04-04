import { Dispatch, SetStateAction } from 'react';
import { SegmentedControl } from '..';
import { controls, SortOption } from '../../constants';
import { useGetWorkersDetailInfiniteQuery } from '../../hooks';
import { sortByNameAndWorkedDate } from '../../service/workData';

interface DetailsSegmentedControlProps {
	year: number;
	month: number;
	workerName: string;
	currentSort: SortOption;
	setCurrentControl: Dispatch<SetStateAction<SortOption>>;
}

const DetailsSegmentedControl = ({ year, month, workerName, currentSort, setCurrentControl }: DetailsSegmentedControlProps) => {
	const { data } = useGetWorkersDetailInfiniteQuery({
		inOrder: currentSort,
		year,
		month,
		workerName,
	});

	const workers = sortByNameAndWorkedDate(data?.pages.map(({ paginationData }) => paginationData.data).flat() ?? [], currentSort);

	return <SegmentedControl data={controls} value={currentSort} setValue={setCurrentControl} hasData={workers?.length !== 0} />;
};

export default DetailsSegmentedControl;
