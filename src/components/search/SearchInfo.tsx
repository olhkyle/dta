import styled from '@emotion/styled';
import { Circle, Flex, Loading, Text } from '..';
import { RecentSearch } from '../../pages/Search';

interface SearchInfoProps {
	registrationNumber: string;
	recentSearchList: RecentSearch[];
	isError: boolean;
	isFetching: boolean;
	isDataFetched: boolean;
	isInputClean: boolean;
}

const SearchInfo = ({ registrationNumber, recentSearchList, isError, isFetching, isDataFetched, isInputClean }: SearchInfoProps) => {
	return (
		<Infos direction="column" margin="1rem auto 1.5rem">
			<CustomFlex direction="column" justifyContent="flex-start" alignItems="flex-start" margin="0 auto">
				<Text typo="h5" color="var(--text-color)">
					💿 주민등록번호
				</Text>
				{isError ? (
					<NoResult>{registrationNumber}</NoResult>
				) : (
					<Flex justifyContent="center" gap="0.75rem" margin="0 auto">
						<SearchResult isDataFetched={isDataFetched} isInputClean={isInputClean}>
							{isFetching ? <Loading type="sm" size={27} /> : !isDataFetched || isInputClean ? '------' : registrationNumber.split('-')[0]}
						</SearchResult>

						<SearchResult isDataFetched={isDataFetched} isInputClean={isInputClean}>
							{isFetching ? <Loading type="sm" size={27} /> : !isDataFetched || isInputClean ? '-------' : registrationNumber.split('-')[1]}
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
										<Circle size={14} bgColor={'var(--color-green-50)'} />
										<span>{item.workerName}</span>
									</Flex>
									<span>{item.registrationNumber}</span>
								</li>
						  ))}
				</RecentSearchList>
			</CustomFlex>
		</Infos>
	);
};

const Infos = styled(Flex)`
	padding: 2rem 0 3rem;
`;

const CustomFlex = styled(Flex)`
	padding: 1rem;
	width: 330px;
	border: 1px solid var(--outline-color);
	border-radius: 8px;

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
	width: 140px;
	font-size: 14px;
	color: ${({ isDataFetched }) => (isDataFetched ? 'var(--text-color)' : 'var(--color-gray-600)')};
	border: ${({ isDataFetched, isInputClean }) =>
		isInputClean ? '1px dashed var(--text-color)' : isDataFetched ? '1px solid var(--text-color)' : '1px dashed var(--text-color)'};
	border-radius: 8px;
	outline: ${({ isDataFetched, isInputClean }) =>
		isInputClean ? '1px solid var(--outline-color)' : isDataFetched ? '1px solid var(--color-green-50)' : 'none'};
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
	font-size: 16px;
	border: 1px solid var(--outline-color);
	border-radius: 8px;
`;

const RecentSearchList = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 1rem auto 0;
	padding: 1.5rem 1rem;
	width: 300px;
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
			display: flex;
			align-items: center;
			font-size: 18px;
		}
	}
`;

export default SearchInfo;
