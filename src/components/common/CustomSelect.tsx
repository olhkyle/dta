import { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';
import { useClickOutside, useId } from '../../hooks';

interface SelectProps {
	data: readonly number[];
	value: number;
	setValue: Dispatch<SetStateAction<number>>;
	unit?: string;
}

const Select = ({ data, value: current, setValue, unit }: SelectProps) => {
	const [open, setOpen] = useState(false);

	const generatedId = useId('custom-select');
	const generatedListId = useId('custom-select-list');

	const ref = useClickOutside(() => setOpen(false));

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
				<BiSolidDownArrow size="14" />
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
							<span>{item === current && <BsCheck size="20" />}</span>
							{item}
							{unit}
						</Option>
					))}
				</Options>
			)}
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	z-index: 10;
`;

const Trigger = styled.button`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 0.2rem;
	padding: 0.5rem 0.65rem;
	font-size: var(--fz-m);
	font-weight: var(--fw-semibold);
	line-height: 1.2;
	border: 1px solid var(--outline-color);
	border-radius: var(--radius);
	color: var(--text-color);
	transition: outline 0.15s ease-out;

	&:hover {
		outline: 1px solid var(--color-gray-400);
		outline-offset: 1px;
	}

	@media screen and (min-width: 640px) {
		gap: 0.4rem;
		padding: 0.75rem 1.4rem;
		font-size: var(--fz-p);
	}

	@media screen and (min-width: 768px) {
		font-size: var(--fz-h6);
	}
`;

const Options = styled.ul`
	position: absolute;
	top: 110%;
	border: 1px solid var(--outline-color);
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
	gap: 0.2rem;
	width: 100%;
	padding: 0.5rem 0.4rem 0.5rem 0.1rem;
	font-size: var(--fz-p);
	font-weight: ${({ isCurrent }) => (isCurrent ? 'var(--fw-bold)' : 'var(--fw-medium)')};
	color: var(--text-color);
	cursor: pointer;

	&:hover {
		background-color: var(--color-green-50);
		color: var(--color-white);
	}

	@media screen and (min-width: 640px) {
		padding: 0.5rem 1rem 0.5rem 0;
		font-size: var(--fz-h7);
	}

	@media screen and (min-width: 768px) {
		font-size: var(--fz-h6);
	}

	span {
		display: inline-flex;
		align-items: center;
		width: 20px;
	}
`;

export default Select;
