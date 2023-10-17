import { useState } from 'react';
import styled from '@emotion/styled';
import { Flex, Loading, SearchInput, Spacer, Text } from '../components';
import { getSpecificWorker } from '../service/workData';
import sleep from '../utils/sleep';

const Search = () => {
	const [workerName, setWorkerName] = useState<string>('');
	const [registrationNumber, setRegistrationNumber] = useState<string>('');
	const [recentSearchList, setRecentSearchList] = useState<{ workerName: string; registrationNumber: string }[]>([]);
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
		<Container>
			<Spacer size={64} />
			<SearchInput
				value={workerName}
				setValue={setWorkerName}
				clearValue={() => {
					setWorkerName('');
					setRegistrationNumber('');
				}}
				onSearchButtonClick={handleSearchResult}
				onKeyDown={e => {
					if ((e.target as HTMLInputElement).value.length === 0) {
						setIsError(false);
						setWorkerName('');
						setRegistrationNumber('');
					}
				}}
			/>

			<Spacer size={16} />
			<Infos direction="column" margin="1.5rem auto">
				<CustomFlex direction="column" justifyContent="flex-start" alignItems="flex-start" margin="0 auto">
					<Text typo="h5" color="var(--text-color)">
						💿 주민등록번호
					</Text>
					{isError ? (
						<NoResult>{registrationNumber}</NoResult>
					) : (
						<Flex justifyContent="center" gap="0.75rem" margin="0 auto">
							<SearchResult isDataFetched={isDataFetched} isInputClean={isInputClean}>
								{isFetching ? (
									<Loading type="sm" size={27} />
								) : !isDataFetched || isInputClean ? (
									'------'
								) : (
									registrationNumber.split('-')[0]
								)}
							</SearchResult>

							<SearchResult isDataFetched={isDataFetched} isInputClean={isInputClean}>
								{isFetching ? (
									<Loading type="sm" size={27} />
								) : !isDataFetched || isInputClean ? (
									'-------'
								) : (
									registrationNumber.split('-')[1]
								)}
							</SearchResult>
						</Flex>
					)}
				</CustomFlex>

				<CustomFlex direction="column" justifyContent="flex-start" alignItems="flex-start" margin="3rem auto">
					<Text typo="h5" color="var(--text-color)">
						💿 최근 검색 내역
					</Text>

					<RecentSearchList>
						{recentSearchList.length === 0
							? '검색 내역이 없습니다 ☕️'
							: recentSearchList.map(item => (
									<li key={item.workerName + item.registrationNumber}>
										<Flex gap="1rem">
											<Circle />
											<span>{item.workerName}</span>
										</Flex>
										<span>{item.registrationNumber}</span>
									</li>
							  ))}
					</RecentSearchList>
				</CustomFlex>
			</Infos>
		</Container>
	);
};

const Container = styled.div``;

const Infos = styled(Flex)`
	padding: 1.5rem 0 3rem;
`;

const CustomFlex = styled(Flex)`
	padding: 1rem;
	width: 300px;
	border: 1px solid var(--text-color);
	border-radius: 8px;
	outline: 2px solid var(--outline-color);
	outline-offset: 2px;

	@media screen and (min-width: 640px) {
		width: 400px;
	}

	@media screen and (min-width: 768px) {
		width: 600px;
	}
`;

const SearchResult = styled.div<{ isDataFetched: boolean; isInputClean: boolean }>`
	margin: 1rem 0;
	padding: var(--btn-md-padding);
	width: 125px;
	font-size: 14px;
	color: ${({ isDataFetched }) => (isDataFetched ? 'var(--text-color)' : 'var(--color-gray-600)')};
	border: ${({ isDataFetched, isInputClean }) =>
		isInputClean ? '1px dashed var(--text-color)' : isDataFetched ? '1px solid var(--text-color)' : '1px dashed var(--text-color)'};
	border-radius: 8px;
	outline: ${({ isDataFetched, isInputClean }) =>
		isInputClean ? '2px solid var(--outline-color)' : isDataFetched ? '2px solid var(--color-green-50)' : 'none'};
	outline-offset: 2px;

	@media screen and (min-width: 640px) {
		width: 180px;
	}

	@media screen and (min-width: 768px) {
		width: 270px;
		font-size: 16px;
	}
`;

const NoResult = styled.div`
	margin: 1rem 0;
	padding: var(--btn-md-padding);
	width: 100%;
	font-size: 14px;
	border: 1px solid var(--outline-color);
	border-radius: 8px;
`;

const RecentSearchList = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 1rem auto 0;
	padding: 1.5rem 1rem;
	width: 270px;
	border-top: 1px solid var(--outline-color);
	border-bottom: 1px solid var(--outline-color);

	li {
		display: inline-flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		font-size: 16px;
		border-bottom: 1px solid var(--text-color);
		outline-offset: 2px;
	}

	@media screen and (min-width: 640px) {
		width: 320px;
	}

	@media screen and (min-width: 768px) {
		width: 520px;

		li {
			font-size: 18px;
		}
	}
`;

const Circle = styled.span`
	display: inline-block;
	width: 16px;
	height: 16px;
	background-color: var(--color-green-50);
	border-radius: 4px;
`;

export default Search;
