import { Dispatch, ReactNode, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { RiLineChartFill } from 'react-icons/ri';
import { RxTable } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { useMediaQuery } from '../../hooks';
import { control, controls, displayType } from '../../constants';

interface SegmentedControlProps<T extends string> {
	data: T[];
	value: ReactNode;
	setValue: Dispatch<SetStateAction<T>>;
	hasData?: boolean;
}

const SegmentedControl = <T extends string>({ data, value: currentPosition, setValue, hasData = true }: SegmentedControlProps<T>) => {
	const isTablet = useMediaQuery('(max-width: 768px');

	const dataDisplayType = (item: T) =>
		item === displayType.LIST ? (
			<RxTable size={isTablet ? '24' : '27'} />
		) : item === displayType.CHART ? (
			<RiLineChartFill size={isTablet ? '24' : '27'} />
		) : item === controls[0] ? (
			control['asc']
		) : (
			control['desc']
		);

	return (
		<Container>
			{data.map(item => (
				<Control
					key={item}
					active={item === currentPosition}
					onClick={() => {
						if (!hasData) {
							return toast.warn('정렬할 데이터가 없습니다.');
						}
						setValue(item);
					}}>
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
	gap: 8px;
	padding: calc(var(--padding-sm) * 0.5);
	background-color: var(--outline-color);
	border-radius: var(--radius);

	@media screen and (min-width: 640px) {
		padding: calc(var(--padding-sm) * 0.5);
	}
`;

const Control = styled.li<{ active: boolean }>`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: calc(var(--padding-md) * 0.2) calc(var(--padding-md) * 0.35);
	border-radius: var(--radius);
	font-size: var(--fz-m);
	font-weight: var(--fw-m);
	background-color: ${({ active }) => (active ? 'var(--bg-color)' : 'var(--outline-color)')};
	cursor: pointer;
	box-shadow: ${({ active }) => active && 'rgba(0, 0, 0, 0.12) 0px 1px 2px'};

	@media screen and (min-width: 640px) {
		padding: calc(var(--padding-md) * 0.35) calc(var(--padding-md) * 0.5);
		font-size: var(--fz-rp);
	}

	@media screen and (min-width: 750px) {
		padding: calc(var(--padding-md) * 0.35) calc(var(--padding-md) * 0.5);
		font-size: var(--fz-h7);
	}
`;

export default SegmentedControl;
