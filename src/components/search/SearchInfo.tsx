import styled from '@emotion/styled';
import { Circle, Flex, Text } from '..';
import { ReactNode } from 'react';
import type { RecentSearch } from '../modal/SearchWorkerModal';

interface SearchInfoProps {
	recentSearchList: RecentSearch[];
	loader: ReactNode;
	isLoading: boolean;
}

const SearchInfo = ({ recentSearchList, loader, isLoading }: SearchInfoProps) => {
	return (
		<CustomFlex direction="column" justifyContent="flex-start" alignItems="flex-start" margin="0 auto" padding="16px" width="100%">
			<Text typo="h6" color="var(--text-color)">
				💿 최근 검색 내역
			</Text>
			<RecentSearchList>
				{recentSearchList.length === 0 ? (
					<EmptyMessage>검색 내역이 없습니다 ☕️</EmptyMessage>
				) : isLoading ? (
					<>{loader}</>
				) : (
					<>
						{recentSearchList.map(({ workerName, registrationNumber }) => (
							<li key={workerName + registrationNumber}>
								<Flex gap="16px">
									<Circle size={14} bgColor={'var(--color-green-50)'} />
									<span>{workerName}</span>
								</Flex>
								<Flex gap="32px">
									<span>{registrationNumber}</span>
								</Flex>
							</li>
						))}
					</>
				)}
			</RecentSearchList>
		</CustomFlex>
	);
};

const CustomFlex = styled(Flex)`
	border: 1px solid var(--outline-color);
	border-radius: var(--radius);
`;

const RecentSearchList = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 8px auto 0;
	padding: 24px 16px;
	width: 100%;
	border-radius: var(--radius);

	li {
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 0;
		font-size: var(--fz-rp);
		border-bottom: 1px solid var(--table-border-color);
	}

	@media screen and (min-width: 768px) {
		li {
			display: flex;
			align-items: center;
			font-size: var(--fz-h7);
		}
	}
`;

const EmptyMessage = styled.div`
	padding: 8px;
	background-color: var(--option-hover-bg-color);
	border-radius: var(--radius);
`;

export default SearchInfo;
