import { useState } from 'react';
import { getSpecificWorker } from '../../service/workData';
import { useLoading, useOverlayFixed } from '../../hooks';
import { SearchInput, SearchInfo } from '..';
import ModalLayout from './ModalLayout';
import { toast } from 'react-toastify';

interface RecentSearch {
	workerName: string;
	registrationNumber: string;
}

interface SearchWorkerModalProps {
	isOpen: boolean;
	order: `modal-${number}`;
	onClose: () => void;
}

const SearchWorkerModal = ({ isOpen, order, onClose }: SearchWorkerModalProps) => {
	const [workerName, setWorkerName] = useState<string>('');
	const [registrationNumber, setRegistrationNumber] = useState<string>('');
	const [recentSearchList, setRecentSearchList] = useState<RecentSearch[]>([]);
	const [isError, setIsError] = useState<boolean>(false);
	const { Loading, isLoading, startTransition } = useLoading();

	useOverlayFixed(isOpen);

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

			setIsError(true);
			toast.error('검색 결과가 없습니다.');
		}
	};

	return (
		<ModalLayout title={'일용직 찾기'} order={order} onClose={onClose}>
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

			<SearchInfo recentSearchList={recentSearchList} />
		</ModalLayout>
	);
};

export default SearchWorkerModal;
