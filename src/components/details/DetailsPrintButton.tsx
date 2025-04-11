import styled from '@emotion/styled';
import { Button } from '..';
import { IoPrintSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { routes, SortOption } from '../../constants';
import { useGetWorkersDetailInfiniteQuery } from '../../hooks';
import { sortByNameAndWorkedDate } from '../../service/workData';
import { getIsAdmin } from '../../store/userSlice';
import { useAppSelector } from '../../store/store';

interface DetailsPrintButtonProps {
	year: number;
	month: number;
	workerName: string;
	currentSort: SortOption;
}

const DetailsPrintButton = ({ year, month, workerName, currentSort }: DetailsPrintButtonProps) => {
	const { data } = useGetWorkersDetailInfiniteQuery({
		inOrder: currentSort,
		year,
		month,
		workerName,
	});

	const navigate = useNavigate();
	const isAdmin = useAppSelector(getIsAdmin);
	const workers = sortByNameAndWorkedDate(data?.pages.map(({ paginationData }) => paginationData.data).flat() ?? [], currentSort);

	return (
		<PrintButton
			type="button"
			onClick={() => {
				if (!isAdmin) {
					toast.warn('관리자만 출력할 수 있습니다');
					return;
				}

				if (isAdmin && workers?.length === 0) {
					toast.warn('해당 월의 출력 대상자가 없습니다');
					return;
				}

				navigate(routes.PRINT, { state: { year, month } });
			}}
			aria-label="print-button">
			<IoPrintSharp size={24} color="var(--color-green-400)" />
		</PrintButton>
	);
};

const PrintButton = styled(Button)`
	display: none;
	padding: calc(var(--padding-md) * 0.6) var(var(--padding-md) * 1.5);
	font-size: var(--fz-p);
	background: linear-gradient(0.45turn, #e1e1e1, var(--color-green-50));
	color: var(--color-white);
	outline-offset: 1px;
	border-radius: calc(var(--radius) * 1.5);
	transition: background-color 0.3s ease-in-out 0.15s;

	&:hover {
		background-color: var(--color-green-200);
	}

	@media screen and (min-width: 640px) {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: calc(var(--padding-md) * 0.6) calc(var(--padding-md) * 2);
		font-size: var(--fz-h6);
	}
`;

export default DetailsPrintButton;
