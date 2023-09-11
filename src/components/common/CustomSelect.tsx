import { useState } from 'react';
import { useClickOutside, useId } from '../../hooks';
import styled from '@emotion/styled';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';

interface SelectProps {
	data: readonly string[];
	defaultValue: string;
	width: number;
}

const Select = ({ data, defaultValue, width }: SelectProps) => {
	const [open, setOpen] = useState(false);
	const [current, setCurrent] = useState(defaultValue);
	const generatedId = useId('custom-select');
	const generatedListId = useId('custom-select-list');

	const ref = useClickOutside(() => setOpen(false));

	const isCurrent = (value: string) => (current === value ? true : false);

	return (
		<Container tabIndex={0} width={width} ref={ref}>
			<Trigger
				type="button"
				id={generatedId}
				onClick={() => setOpen(!open)}
				aria-controls={generatedListId}
				aria-expanded={open}
				tabIndex={0}
				width={width}>
				<span>{current}</span>
				<BiSolidDownArrow size="14" />
			</Trigger>
			{open && (
				<Options id={generatedListId} role="listbox" aria-labelledby={generatedId} width={width}>
					{data.map(item => (
						<Option
							key={item}
							onClick={() => {
								setCurrent(item);
								setOpen(false);
							}}
							isCurrent={isCurrent(item)}
							data-selected={isCurrent(item)}
							tabIndex={0}>
							<span>{isCurrent(item) && <BsCheck size="20" />}</span>
							{item}
						</Option>
					))}
				</Options>
			)}
		</Container>
	);
};

const Container = styled.div<{ width: number }>`
	position: relative;
	width: ${({ width }) => `${width}px`};
`;

const Trigger = styled.button<{ width: number }>`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 0.4rem;
	padding: 0.75rem 1.4rem;
	width: ${({ width }) => `${width}px`};
	font-size: 19px;
	font-weight: 600;
	line-height: 1.2;
	border: 1px solid var(--outline-color);
	border-radius: var(--radius);
	color: var(--text-color);

	&:hover {
		outline: 2px solid var(--text-color);
		outline-offset: 2px;
	}
`;

const Options = styled.ul<{ width: number }>`
	position: absolute;
	top: 110%;
	border: 1px solid var(--outline-color);
	border-radius: var(--radius);
	background-color: var(--bg-color);
	overflow-y: scroll;
`;

const Option = styled.li<{ isCurrent: boolean }>`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 0.2rem;
	width: 100%;
	padding: 0.5rem 0.6rem 0.5rem 0.1rem;
	font-size: 17px;
	font-weight: ${({ isCurrent }) => (isCurrent ? 700 : 500)};
	color: var(--text-color);
	cursor: pointer;

	&:hover {
		background-color: var(--color-green-50);
		color: var(--color-white);
	}

	span {
		display: inline-flex;
		align-items: center;
		width: 20px;
	}
`;

export default Select;
