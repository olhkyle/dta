import { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useClickOutside, useId } from '../../hooks';

interface DatePickerProps {
	selected: Date | undefined;
	setSelected: (date: Date | undefined) => void | Dispatch<SetStateAction<Date>>;
	disabled?: boolean;
}

const DatePicker = ({ selected, setSelected, disabled = false }: DatePickerProps) => {
	const [isDatePickerActive, setIsDatePickerActive] = useState<boolean>(false);
	const generatedId = useId('calendar-selector');

	const formattedDay: string = format(selected ?? new Date(), 'yyyy-MM-dd');

	const toggleDayPicker = () => setIsDatePickerActive(!isDatePickerActive);
	const closeDayPicker = () => setIsDatePickerActive(false);

	const containerRef = useClickOutside<HTMLDivElement>(closeDayPicker);

	return (
		<Container ref={containerRef}>
			<FieldTitle>출력일</FieldTitle>
			<CalendarSelectorContainer active={isDatePickerActive} disabled={disabled} onClick={toggleDayPicker}>
				<CalendarSelector
					type="text"
					value={formattedDay}
					id={generatedId}
					active={isDatePickerActive}
					disabled={disabled}
					aria-label="calendar-selector"
					readOnly
				/>
				<FaRegCalendarCheck
					size="20"
					color="var(--text-color)"
					onClick={e => {
						e.stopPropagation();
						if (disabled) return;

						toggleDayPicker();
					}}
				/>
			</CalendarSelectorContainer>
			{isDatePickerActive && (
				<SingleDayPicker
					mode="single"
					defaultMonth={new Date()}
					showOutsideDays={true}
					locale={ko}
					selected={selected}
					onSelect={setSelected}
					footer={
						selected ? (
							<DayDescription>
								선택한 날짜는 <strong>{format(selected, 'yyyy-MM-dd')}</strong> 입니다.
								<button type="button" onClick={closeDayPicker}>
									확인
								</button>
							</DayDescription>
						) : (
							<DayDescription>날짜를 선택해 주세요.</DayDescription>
						)
					}
				/>
			)}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const FieldTitle = styled.div`
	padding: calc(var(--padding-sm) * 0.5) 0;
	font-size: var(--fz-p);
	font-weight: var(--fw-medium);
`;

const CalendarSelectorContainer = styled.div<{ active: boolean; disabled: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 calc(var(--padding-sm) * 0.5);
	min-height: 48px;
	min-width: 270px;
	box-shadow: ${({ active }) => (active ? 'inset 0 0 0 1px var(--text-color)' : 'inset 0 0 0 1px var(--outline-color)')};
	border-radius: var(--radius);
	background-color: ${({ active, disabled }) =>
		active ? 'var(--btn-text-color)' : disabled ? 'var(--outline-color)' : 'var(--color-gray-opacity-50)'};

	cursor: pointer;

	&:focus {
		box-shadow: inset 0 0 0 1px var(--text-color);
	}

	svg {
		margin-right: 16px;
	}
`;

const CalendarSelector = styled.input<{ active: boolean; disabled: boolean }>`
	padding: calc(var(--padding-sm) * 1.5);
	width: 100%;
	font-size: var(--fz-rp);
	font-weight: var(--fw-medium);
	color: ${({ disabled }) => (disabled ? 'var(--disabled-text-color)' : 'var(--text-color)')};
	background-color: ${({ active, disabled }) => (active ? 'var(--btn-text-color)' : disabled ? 'var(--outline-color)' : 'none')};
	border-top-left-radius: var(--radius);
	border-bottom-left-radius: var(--radius);
	cursor: pointer;
	-webkit-appearance: none;
`;

const SingleDayPicker = styled(DayPicker)`
	max-width: 270px;
	.rdp-months {
		width: 240px;
	}

	.rdp-month {
		margin-left: -1rem;
		padding: var(--padding-md);
		border: 1px solid var(--outline-color);
		border-radius: 12px;
	}

	.rdp-day_selected {
		--rdp-accent-color: var(--color-green-300);
	}
`;

const DayDescription = styled.div`
	margin: 12px 0 0 8px;
	font-size: var(--fz-m);

	strong {
		font-size: var(--fz-rp);
		color: var(--color-green-300);
	}

	button {
		margin-left: 8px;
		padding: calc(var(--padding-md) * 0.4) calc(var(--padding-md) * 0.5);
		font-weight: var(--fw-semibold);
		color: var(--color-white);
		background-color: var(--color-green-300);
		border-radius: var(--radius);
	}
`;

export default DatePicker;
