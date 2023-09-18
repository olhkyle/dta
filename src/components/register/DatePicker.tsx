import { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useClickOutside } from '../../hooks';

interface DatePickerProps {
	selectedDay: Date | undefined;
	setSelectedDay: Dispatch<SetStateAction<Date | undefined>>;
}

const DatePicker = ({ selectedDay, setSelectedDay }: DatePickerProps) => {
	const [isDatePickerActive, setIsDatePickerActive] = useState<boolean>(false);
	const formattedDay: string = format(selectedDay ?? new Date(), 'yyyy-MM-dd');

	const toggleDayPicker = () => setIsDatePickerActive(!isDatePickerActive);
	const closeDayPicker = () => setIsDatePickerActive(false);

	const containerRef = useClickOutside(closeDayPicker);

	return (
		<Container ref={containerRef}>
			<FieldTitle>출력일</FieldTitle>
			<CalendarSelectorContainer>
				<CalendarSelector
					type="text"
					value={formattedDay}
					active={isDatePickerActive}
					onFocus={toggleDayPicker}
					aria-label="calendar-selector"
					readOnly
				/>
				<FaRegCalendarCheck size="20" color="var(--text-color)" onClick={toggleDayPicker} />
			</CalendarSelectorContainer>
			{isDatePickerActive && (
				<SingleDayPicker
					mode="single"
					defaultMonth={new Date()}
					showOutsideDays={true}
					locale={ko}
					selected={selectedDay}
					onSelect={setSelectedDay}
					footer={
						selectedDay ? (
							<DayDescription>
								선택한 날짜는 <strong>{format(selectedDay, 'yyyy-MM-dd')}</strong> 입니다.
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
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const FieldTitle = styled.label`
	padding: 4px 0;
	font-size: 18px;
	font-weight: 500;
`;

const CalendarSelectorContainer = styled.div`
	position: relative;
	width: 280px;

	svg {
		position: absolute;
		right: 1rem;
		top: 1.4rem;
		cursor: pointer;
	}
`;

const CalendarSelector = styled.input<{ active: boolean }>`
	margin-top: 0.5rem;
	padding: 0.8rem 1.2rem;
	width: 280px;
	font-size: 16px;
	font-weight: 500;
	color: var(--text-color);
	border-radius: 8px;
	cursor: pointer;

	box-shadow: ${({ active }) => (active ? 'inset 0 0 0 1px var(--text-color)' : 'inset 0 0 0 1px var(--outline-color)')};

	&:focus {
		box-shadow: inset 0 0 0 1px var(--text-color);
	}
`;

const SingleDayPicker = styled(DayPicker)`
	.rdp-months {
		width: 300px;
	}

	.rdp-month {
		margin-left: -1rem;
		padding: 1rem;
		border: 1px solid var(--outline-color);
		border-radius: 12px;
	}

	.rdp-day_selected {
		--rdp-accent-color: var(--color-green-300);
	}
`;

const DayDescription = styled.div`
	margin: 0.75rem 0 0 0.5rem;
	font-size: 14px;

	strong {
		font-size: 16px;
		color: var(--color-green-300);
	}

	button {
		margin-left: 0.5rem;
		padding: 0.4rem 0.5rem;
		font-weight: 600;
		color: var(--color-white);
		background-color: var(--color-green-300);
		border-radius: 8px;
	}
`;

export default DatePicker;
