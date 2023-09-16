import styled from '@emotion/styled';
import { Button, Flex, Text } from '../components';
import { useGoBack } from '../hooks';

const NotFound = () => {
	const goBack = useGoBack();

	return (
		<>
			<Flex direction="column" margin="10rem auto">
				<Text typo="h3" color="var(--text-color)">
					서비스에 문제가 발생하였습니다 🚀
				</Text>
				<Flex direction="column" margin="2rem">
					<Text color="var(--text-color)">방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 사용하실 수 없습니다.</Text>
					<Text color="var(--text-color)">입력하신 주소가 정확한지 다시 한 번 확인해 주세요</Text>
				</Flex>
				<GoBackButton type="button" onClick={goBack}>
					돌아가기
				</GoBackButton>
			</Flex>
		</>
	);
};

const GoBackButton = styled(Button)`
	color: var(--bg-color);
	background-color: var(--color-green-50);
`;

export default NotFound;
