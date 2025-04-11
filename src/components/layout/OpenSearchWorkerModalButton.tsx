import styled from '@emotion/styled';
import { RiMenuSearchLine } from 'react-icons/ri';
import { SearchWorkerModal } from '..';
import { useAppDispatch } from '../../store/store';
import { open } from '../../store/modalSlice';

const OpenSearchWorkerModalButton = () => {
	const dispatch = useAppDispatch();
	const openModal = () => dispatch(open({ Component: SearchWorkerModal, props: { data: null, isOpen: true } }));

	return (
		<Container type="button" onClick={openModal}>
			<RiMenuSearchLine size="24" color={'var(--btn-text-color)'} />
		</Container>
	);
};

const Container = styled.button`
	position: fixed;
	bottom: 124px;
	right: 4dvw;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: calc(var(--padding-md) * 0.65);
	font-weight: var(--fw-semibold);
	color: var(--color-white);
	background-color: var(--btn-bg-color);
	border: 1px solid var(--color-gray-opacity-200);
	border-radius: var(--radius);
	z-index: var(--modal-index);
	transition: background-color 0.15s ease-in-out;

	&:focus,
	&:hover {
		background-color: var(--btn-hover-bg-color);
	}
`;

export default OpenSearchWorkerModalButton;
