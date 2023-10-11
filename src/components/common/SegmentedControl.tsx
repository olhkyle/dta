import { ControlKeys } from '../../constants/sortControls';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';

interface SegmentedControlProps {
	data: ControlKeys[];
	value: string;
	setValue: Dispatch<SetStateAction<ControlKeys>>;
}

const SegmentedControl = ({ data, value: currentPosition, setValue }: SegmentedControlProps) => {
	return (
		<Container>
			{data.map(item => (
				<Control key={item} active={item === currentPosition} onClick={() => setValue(item)}>
					{item}
				</Control>
			))}
		</Container>
	);
};

const Container = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
	padding: 0.25rem;
	background-color: var(--outline-color);
	border-radius: var(--radius);

	@media screen and (min-width: 640px) {
		padding: 0.5rem;
	}
`;

const Control = styled.li<{ active: boolean }>`
	padding: 0.2rem 0.4rem;
	border-radius: var(--radius);
	font-size: 14px;
	font-weight: 500;
	background-color: ${({ active }) => (active ? 'var(--bg-color)' : 'var(--outline-color)')};
	cursor: pointer;
	box-shadow: ${({ active }) => active && 'rgba(0, 0, 0, 0.12) 0px 1px 2px'};

	@media screen and (min-width: 640px) {
		padding: 0.35rem 0.5rem;
		font-size: 16px;
	}

	@media screen and (min-width: 720px) {
		padding: 0.35rem 0.5rem;
		font-size: 18px;
	}
`;

export default SegmentedControl;
