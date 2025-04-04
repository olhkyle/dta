import { Dispatch, SetStateAction } from 'react';
import { controls, SortOption } from '../../constants';
import { useGetWorkersOverviewQuery } from '../../hooks';
import { SegmentedControl } from '../common';

interface OverviewSegmentedControl {
	year: number;
	month: number;
	workerName: string;
	currentSort: SortOption;
	setCurrentSort: Dispatch<SetStateAction<SortOption>>;
}

const OverviewSegmentedControl = ({ year, month, workerName, currentSort, setCurrentSort }: OverviewSegmentedControl) => {
	const data = useGetWorkersOverviewQuery({ year, month, workerName });

	return <SegmentedControl data={controls} value={currentSort} setValue={setCurrentSort} hasData={data?.workers?.length !== 0} />;
};

export default OverviewSegmentedControl;
