import styled from '@emotion/styled';
import { Portal } from '..';
import { close, getModals } from '../../store/modalSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const Modal = () => {
	const modals = useAppSelector(getModals);
	const dispatch = useAppDispatch();

	return (
		<Portal>
			{modals.length > 0 && (
				<Container>
					{modals.map(({ Component, props }, index) => {
						const closeModal = () => dispatch(close({ Component }));
						const handleSubmit = (onGoing: boolean) => props?.onSubmit(onGoing);
						return <Component key={index} onClose={closeModal} onSubmit={handleSubmit} />;
					})}
				</Container>
			)}
		</Portal>
	);
};

const Container = styled.div`
	position: fixed;
	max-width: 100%;
	min-width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.2);
	visibility: 'visible';
	inset: 0px;
	z-index: 9990;
`;

export default Modal;
