import { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';
import { useClickOutside, useId, useMediaQuery } from '../../hooks';

interface SelectProps<T extends number | string> {
	data: readonly T[];
	value: T;
	setValue: Dispatch<SetStateAction<T>>;
	unit?: string;
}

const Select = <T extends number | string>({ data, value: current, setValue, unit }: SelectProps<T>) => {
	const [open, setOpen] = useState(false);

	const generatedId = useId('custom-select');
	const generatedListId = useId('custom-select-list');
	const isMobile = useMediaQuery('(max-width: 640px)');

	const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

	return (
		<Container tabIndex={0} ref={ref}>
			<Trigger
				type="button"
				id={generatedId}
				onClick={() => setOpen(!open)}
				aria-controls={generatedListId}
				aria-expanded={open}
				tabIndex={0}>
				<span>
					{current} {unit}
				</span>
				<BiSolidDownArrow size={isMobile ? '12' : '14'} />
			</Trigger>
			{open && (
				<Options id={generatedListId} role="listbox" aria-labelledby={generatedId}>
					{data.map(item => (
						<Option
							key={item}
							onClick={() => {
								setValue(item);
								setOpen(false);
							}}
							isCurrent={item === current}
							data-selected={item === current}
							tabIndex={0}>
							<CheckedArea>{item === current && <BsCheck size="20" />}</CheckedArea>
							<span>
								{item}
								{unit}
							</span>
						</Option>
					))}
				</Options>
			)}
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	display: inline-block;
	z-index: 10;
`;

const Trigger = styled.button`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 0.2rem;
	padding: var(--padding-sm) calc(var(--padding-md) * 0.65);
	font-size: var(--fz-m);
	font-weight: var(--fw-semibold);
	line-height: 1.2;
	border: 1px solid var(--border-color);
	border-radius: var(--radius);
	color: var(--text-color);
	transition: background 0.15s ease-in-out;

	&:hover {
		background-color: var(--btn-light-bg-color);
	}

	@media screen and (min-width: 640px) {
		gap: 0.4rem;
		padding: calc(var(--padding-md) * 0.75) calc(var(--padding-md) * 1.4);
		font-size: var(--fz-p);
	}

	@media screen and (min-width: 768px) {
		font-size: var(--fz-h6);
	}
`;

const Options = styled.ul`
	position: absolute;
	top: 110%;
	border: 1px solid var(--border-color);
	border-radius: var(--radius);
	background-color: var(--bg-color);
	overflow-y: scroll;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */

	::-webkit-scrollbar {
		display: none;
	}
`;

const Option = styled.li<{ isCurrent: boolean }>`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	width: 100%;
	padding: calc(var(--padding-md) * 0.5) calc(var(--padding-md) * 0.4) calc(var(--padding-md) * 0.5) calc(var(--padding-md) * 0.1);
	font-size: var(--fz-p);
	font-weight: ${({ isCurrent }) => (isCurrent ? 'var(--fw-bold)' : 'var(--fw-medium)')};
	color: var(--text-color);
	transition: all 0.15s ease-in-out;
	cursor: pointer;

	&:hover {
		background-color: var(--btn-bg-color);
		color: var(--bg-color);
	}

	@media screen and (min-width: 640px) {
		padding: calc(var(--padding-md) * 0.5) calc(var(--padding-md)) calc(var(--padding-md) * 0.5) 0;
		font-size: var(--fz-h7);
	}

	@media screen and (min-width: 768px) {
		font-size: var(--fz-h6);
	}
`;

const CheckedArea = styled.span`
	display: inline-flex;
	align-items: center;
	min-width: 20px;
`;

export default Select;
