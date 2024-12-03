import styled from '@emotion/styled';
import { Button, Circle, Flex, Text } from '..';
import { RecentSearch } from '../../pages/Search';
import { toast } from 'react-toastify';

interface SearchInfoProps {
	recentSearchList: RecentSearch[];
}

const SearchInfo = ({ recentSearchList }: SearchInfoProps) => {
	//TODO:
	// 1. isLoading, Loading 컴포넌트 SearchWorkerModal에서 prop으로 넘겨받기
	// 2. error 처리
	const handleCopyClipboard = async (text: string) => {
		try {
			if (navigator) {
				await navigator.clipboard.writeText(text);
				toast.success('성공적으로 복사되었습니다.');
			}
		} catch (error) {
			console.error(error);
			toast.error('복사하는 데 문제가 발생하였습니다.');
		}
	};
	return (
		<CustomFlex direction="column" justifyContent="flex-start" alignItems="flex-start" margin="0 auto" padding="16px" width="100%">
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
								<Flex gap="32px">
									<span>{registrationNumber}</span>
									<CopyButton type="button" onClick={() => handleCopyClipboard(workerName)}>
										복사
									</CopyButton>
								</Flex>
							</li>
					  ))}
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
	padding: 24px 8px;
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

const CopyButton = styled(Button)`
	color: var(--color-white);
	background-color: var(--color-black);

	&:focus,
	&:hover {
		background-color: var(--color-gray-900);
	}
`;

export default SearchInfo;
