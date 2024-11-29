import styled from '@emotion/styled';
import { Portal } from '..';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { close, getModals } from '../../store/modalSlice';

const ModalContainer = () => {
	const modals = useAppSelector(getModals);
	const dispatch = useAppDispatch();

	return (
		<Portal>
			{modals.length > 0 && (
				<Container>
					{modals.map(({ Component, props }, index) => {
						const closeModal = () => dispatch(close({ Component }));

						if (props) {
							return <Component key={index} onClose={closeModal} {...props} />;
						}
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
	height: 100dvh;
	visibility: 'visible';
	inset: 0px;
	z-index: var(--modal-index);
`;

export default ModalContainer;
