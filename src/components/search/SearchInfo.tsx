import styled from '@emotion/styled';
import { Circle, Flex, SmallLoading, Text } from '..';
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
		<Infos direction="column" margin="16px auto 24px">
			<CustomFlex direction="column" justifyContent="flex-start" alignItems="flex-start" margin="0 auto">
				<Text typo="h5" color="var(--text-color)">
					💿 주민등록번호
				</Text>
				{isError ? (
					<NoResult>{registrationNumber}</NoResult>
				) : (
					<Flex justifyContent="center" gap="12px" margin="0 auto" width="100%">
						<SearchResult isDataFetched={isDataFetched} isInputClean={isInputClean}>
							{isFetching ? <SmallLoading /> : !isDataFetched || isInputClean ? '------' : registrationNumber.split('-')[0]}
						</SearchResult>

						<SearchResult isDataFetched={isDataFetched} isInputClean={isInputClean}>
							{isFetching ? <SmallLoading /> : !isDataFetched || isInputClean ? '-------' : registrationNumber.split('-')[1]}
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
						: recentSearchList.map(({ workerName, registrationNumber }) => (
								<li key={workerName + registrationNumber}>
									<Flex gap="16px">
										<Circle size={14} bgColor={'var(--color-green-50)'} />
										<span>{workerName}</span>
									</Flex>
									<span>{registrationNumber}</span>
								</li>
						  ))}
				</RecentSearchList>
			</CustomFlex>
		</Infos>
	);
};

const Infos = styled(Flex)`
	padding: 32px 16px;
`;

const CustomFlex = styled(Flex)`
	padding: 16px;
	width: 100%;
	border: 1px solid var(--outline-color);
	border-radius: var(--radius);
`;

const SearchResult = styled.div<{ isDataFetched: boolean; isInputClean: boolean }>`
	margin: 16px 0;
	padding: var(--btn-md-padding);
	width: 100%;
	font-size: var(--fz-m);
	color: ${({ isDataFetched }) => (isDataFetched ? 'var(--text-color)' : 'var(--color-gray-600)')};
	border: ${({ isDataFetched, isInputClean }) =>
		isInputClean ? '1px solid var(--outline-color)' : isDataFetched ? '1px solid var(--color-green-50)' : 'none'};
	border-radius: var(--radius);
	outline: ${({ isDataFetched, isInputClean }) =>
		isInputClean ? '1px dashed var(--text-color)' : isDataFetched ? '1px solid var(--color-gray-600)' : '1px dashed var(--text-color)'};
	outline-offset: 2px;

	@media screen and (min-width: 768px) {
		font-size: var(--fz-p);
	}
`;

const NoResult = styled.div`
	margin: 16px 0;
	padding: var(--btn-md-padding);
	width: 100%;
	font-size: var(--fz-rp);
	border: 1px solid var(--outline-color);
	border-radius: var(--radius);
`;

const RecentSearchList = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 16px auto 0;
	padding: 24px 16px;
	width: 100%;
	border-top: 1px solid var(--outline-color);
	border-bottom: 1px solid var(--outline-color);

	li {
		display: inline-flex;
		justify-content: space-between;
		padding: 8px 0;
		font-size: var(--fz-rp);
		border-bottom: 1px solid var(--text-color);
		outline-offset: 2px;
	}

	@media screen and (min-width: 768px) {
		li {
			display: flex;
			align-items: center;
			font-size: var(--fz-h7);
		}
	}
`;

export default SearchInfo;
