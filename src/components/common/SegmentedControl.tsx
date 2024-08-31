import { Dispatch, ReactNode, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { RiLineChartFill } from 'react-icons/ri';
import { RxTable } from 'react-icons/rx';
import { useMediaQuery } from '../../hooks';

interface SegmentedControlProps<T extends string> {
	data: T[];
	value: ReactNode;
	setValue: Dispatch<SetStateAction<T>>;
}

const SegmentedControl = <T extends string>({ data, value: currentPosition, setValue }: SegmentedControlProps<T>) => {
	const isTabletScreenSize = useMediaQuery('(max-width: 768px');

	const dataDisplayType = (item: T) =>
		item === '목록' ? (
			<RxTable size={isTabletScreenSize ? '24' : '27'} />
		) : item === '차트' ? (
			<RiLineChartFill size={isTabletScreenSize ? '24' : '27'} />
		) : item === 'asc' ? (
			'오래된 순'
		) : (
			'최신 순'
		);

	return (
		<Container>
			{data.map(item => (
				<Control key={item} active={item === currentPosition} onClick={() => setValue(item)}>
					{dataDisplayType(item)}
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
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: 0.2rem 0.35rem;
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

	@media screen and (min-width: 750px) {
		padding: 0.35rem 0.5rem;
		font-size: 18px;
	}
`;

export default SegmentedControl;
