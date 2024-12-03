import { useState } from 'react';
import styled from '@emotion/styled';
import { SearchInput, SearchInfo } from '../components';
import { getSpecificWorker } from '../service/workData';
import { useLoading } from '../hooks';

export interface RecentSearch {
	workerName: string;
	registrationNumber: string;
}

const Search = () => {
	const [workerName, setWorkerName] = useState<string>('');
	const [registrationNumber, setRegistrationNumber] = useState<string>('');
	const [recentSearchList, setRecentSearchList] = useState<RecentSearch[]>([]);
	const [isError, setIsError] = useState<boolean>(false);
	const { Loading, isLoading, startTransition } = useLoading();

	const handleSearchResult = async () => {
		try {
			const data = await startTransition(
				getSpecificWorker({
					workerName: workerName,
				}),
			);

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
		}
	};

	return (
		<Container>
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
				isLoading={isLoading}
				loader={Loading()}
				isDataFetched={registrationNumber.length !== 0}
				isInputClean={workerName.length === 0}
			/>
		</Container>
	);
};

const Container = styled.div`
	max-width: 600px;
	width: 100%;
`;

export default Search;
