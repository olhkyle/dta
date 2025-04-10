import styled from '@emotion/styled';
import { MdPlace } from 'react-icons/md';
import { Flex, Label, Content } from '..';

const WorkPlace = () => {
	return (
		<Container direction={'column'} justifyContent={'space-between'} alignItems={'flex-start'} gap={'8px'} padding={'var(--padding-md)'}>
			<Label>
				<div>근로지역</div>
				<MdPlace size="21" color="var(--color-gray-500)" />
			</Label>
			<Content>
				<div>+ 10</div>
				<span>곳</span>
			</Content>
			<WorkPlaceList>
				<li>수원 스타필드</li>
				<li>퓨어다</li>
			</WorkPlaceList>
		</Container>
	);
};

const Container = styled(Flex)`
	border: 1px solid var(--outline-color);
	border-radius: var(--radius);
`;

const WorkPlaceList = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 8px;

	li {
		padding: calc(var(--padding-sm) * 0.5) var(--padding-sm);
		color: var(--bg-color);
		background-color: var(--btn-hover-bg-color);
		font-size: var(--fz-sm);
		font-weight: var(--fw-medium);
		border: 1px solid var(--outline-color);
		border-radius: var(--radius);
	}
`;

export default WorkPlace;
