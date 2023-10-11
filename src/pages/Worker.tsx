import styled from '@emotion/styled';
import { Text, Wip } from '../components';

const Worker = () => {
	// const { id } = useParams();

	// TODO: 이름 / 일별 금액 / 일한 횟수 / 총 합계

	return (
		<Container>
			<Wip bgColor="var(--color-orange-200)">
				<Text typo="h6" color="var(--bg-color)">
					일용직 상세
				</Text>
			</Wip>
			<Wip bgColor="var(--color-purple)">
				<Text color="var(--bg-color)">
					추후 <code>d3.js</code> 와 함께 통계 형태로 보여질 예정입니다.
				</Text>
			</Wip>
			<Wip bgColor="var(--color-green-300)">
				<Text color="var(--bg-color)">보여질 데이터는 이름, 일별 지불 금액, 월별 일한 횟수, 그리고 월별 총 금액 합계 등입니다.</Text>
			</Wip>
			<Wip bgColor="var(--color-blue-300)">
				<Text color="var(--bg-color)">해당 데이터는 그래프 형태로 그려질 예정입니다.</Text>
			</Wip>
		</Container>
	);
};

const Container = styled.div`
	margin-top: 2rem;
`;

export default Worker;
