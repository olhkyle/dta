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
						return <Component key={index} isOpen={props?.isOpen} onClose={closeModal} data={props?.data} />;
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
	visibility: 'visible';
	inset: 0px;
	z-index: 9990;
`;

export default Modal;
