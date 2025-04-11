import styled from '@emotion/styled';
import notfoundImage from '../assets/notfound.webp';
import { Button, Flex, Text } from '../components';
import { useGoBack } from '../hooks';

const NotFoundPage = () => {
	const goBack = useGoBack();

	return (
		<CustomFlex direction={'column'} justifyContent={'center'} alignItems={'center'} margin={'0 auto'} height={'100dvh'}>
			<Text typo={'h5'} color={'var(--text-color)'}>
				서비스에 문제가 발생하였습니다
			</Text>
			<Flex direction={'column'} gap={'4px'} margin={'16px auto 32px'} width={'300px'}>
				<p>
					방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 사용하실 수 없습니다. 입력하신 주소가 정확한지 다시 한 번 확인해 주세요.
				</p>
			</Flex>
			<GoBackButton type="button" onClick={goBack}>
				돌아가기
			</GoBackButton>
			<ImageBlock>
				<img src={notfoundImage} alt="not found" />
			</ImageBlock>
		</CustomFlex>
	);
};

const CustomFlex = styled(Flex)`
	max-width: 300px;

	@media screen and (min-width: 640px) {
		min-width: 500px;
	}
`;

const GoBackButton = styled(Button)`
	padding: var(--padding-sm) var(--padding-md);
	color: var(--color-white);
	background-color: var(--color-dark);
`;

const ImageBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 64px;
	width: 300px;

	img {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: var(--radius);
	}
`;

export default NotFoundPage;
