import styled from '@emotion/styled';
import { Button, Circle, Flex, Text } from '../components';
import { useGoBack } from '../hooks';

const NotFoundPage = () => {
	const goBack = useGoBack();

	return (
		<Flex direction="column" margin="10rem auto">
			<Text typo="h5" color="var(--text-color)">
				서비스에 문제가 발생하였습니다 🚀
			</Text>
			<CustomFlex direction="column" gap="0.3rem" margin="1rem auto 2rem">
				<Text color="var(--text-color)">방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 사용하실 수 없습니다. </Text>
				<Text color="var(--text-color)"> 입력하신 주소가 정확한지 다시 한 번 확인해 주세요</Text>
			</CustomFlex>
			<GoBackButton type="button" onClick={goBack}>
				돌아가기
			</GoBackButton>
			<CustomFlex margin="3rem 0" gap="1rem">
				<Circle size={40} bgColor="var(--color-gray-100)" />
				<Circle size={40} bgColor="var(--color-gray-200)" />
				<Circle size={40} bgColor="var(--color-gray-300)" />
				<Circle size={40} bgColor="var(--color-gray-400)" />
				<Circle size={40} bgColor="var(--color-gray-500)" />
				<Circle size={40} bgColor="var(--color-gray-600)" />
				<Circle size={40} bgColor="var(--color-gray-700)" />
				<Circle size={40} bgColor="var(--color-gray-800)" />
				<Circle size={40} bgColor="var(--color-gray-900)" />
			</CustomFlex>
		</Flex>
	);
};

const GoBackButton = styled(Button)`
	color: var(--color-white);
	background-color: var(--color-green-50);
`;

const CustomFlex = styled(Flex)`
	flex-direction: column;
	text-align: center;

	@media screen and (min-width: 640px) {
		flex-direction: row;
	}
`;

export default NotFoundPage;
