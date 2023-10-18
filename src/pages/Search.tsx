import { useState } from 'react';
import { SearchInput, SearchInfo } from '../components';
import { getSpecificWorker } from '../service/workData';
import sleep from '../utils/sleep';

export interface RecentSearch {
	workerName: string;
	registrationNumber: string;
}

const Search = () => {
	const [workerName, setWorkerName] = useState<string>('');
	const [registrationNumber, setRegistrationNumber] = useState<string>('');
	const [recentSearchList, setRecentSearchList] = useState<RecentSearch[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const isDataFetched = registrationNumber.length !== 0;
	const isInputClean = workerName.length === 0;

	const handleSearchResult = async () => {
		try {
			if (!isFetching) {
				setIsFetching(true);
			}

			await sleep(500);
			const data = await getSpecificWorker({
				workerName: workerName,
			});

			const registrationNumber = data.registrationNumberFront + '-' + data.registrationNumberBack;

			setRegistrationNumber(registrationNumber);
			setRecentSearchList(recentSearchList => {
				if (recentSearchList.find(item => item.workerName === workerName)) {
					return [...recentSearchList];
				}
				return [...recentSearchList, { workerName, registrationNumber }];
			});
		} catch (e) {
			console.error(e);
			setRegistrationNumber('검색 결과가 없습니다 ☕️');
			setIsError(true);
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<div>
			<SearchInput
				value={workerName}
				setValue={setWorkerName}
				clearValue={() => {
					setIsError(false);
					setWorkerName('');
					setRegistrationNumber('');
				}}
				onSearchButtonClick={handleSearchResult}
				onKeyDown={(e: React.SyntheticEvent) => {
					if (e.nativeEvent instanceof KeyboardEvent) {
						if (e.nativeEvent.key === 'Enter') {
							handleSearchResult();
							return;
						}
					}

					if ((e.target as HTMLInputElement).value.length === 0) {
						setIsError(false);
						setWorkerName('');
						setRegistrationNumber('');
					}
				}}
			/>

			<SearchInfo
				registrationNumber={registrationNumber}
				recentSearchList={recentSearchList}
				isError={isError}
				isFetching={isFetching}
				isDataFetched={isDataFetched}
				isInputClean={isInputClean}
			/>
		</div>
	);
};

export default Search;
