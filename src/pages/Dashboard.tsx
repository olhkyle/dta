import styled from '@emotion/styled';
import { EmptyIndicator, SearchInfo, SearchInput } from '../components';
import { useState } from 'react';
import { getSpecificWorker } from '../service/workData';
import { useLoading } from '../hooks';
import { toast } from 'react-toastify';

interface RecentSearch {
	workerName: string;
	registrationNumber: string;
}

const Dashboard = () => {
	const [workerName, setWorkerName] = useState<string>('');

	const [recentSearchList, setRecentSearchList] = useState<RecentSearch[]>([]);

	const [isError, setIsError] = useState<boolean>(false);

	const { startTransition } = useLoading();

	const handleSearchResult = async () => {
		try {
			const data = await startTransition(
				getSpecificWorker({
					workerName: workerName,
				}),
			);

			const registrationNumber = data.registrationNumberFront + '-' + data.registrationNumberBack;

			setRecentSearchList(recentSearchList => {
				if (recentSearchList.find(item => item.workerName === workerName)) {
					return [...recentSearchList];
				}
				return [...recentSearchList, { workerName, registrationNumber }];
			});
		} catch (e) {
			console.error(e);
			setIsError(true);

			if (isError) {
				toast.error('검색결과가 없습니다.');
			}
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
					}
				}}
			/>

			<SearchInfo recentSearchList={recentSearchList} />
			<EmptyIndicator>🛹 대시보드 추가 예정입니다</EmptyIndicator>
		</Container>
	);
};

const Container = styled.div`
	padding: 0 16px;
	max-width: 1280px;
	width: 100%;
`;

export default Dashboard;
