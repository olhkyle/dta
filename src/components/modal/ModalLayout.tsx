import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { MdClose } from 'react-icons/md';
import { Button, Flex, Text } from '..';

interface ModalLayoutProps {
	title: string | ReactNode;
	onClose: () => void;
	order: `modal-${number}`;
	children: ReactNode;
}

const ModalLayout = ({ title, onClose, order, children }: ModalLayoutProps) => {
	return (
		<>
			<Container order={+order.split('-')[1]} data-modal-order={order}>
				<Header justifyContent={'space-between'} alignItems={'center'}>
					<Text typo={'h3'} color={'var(--text-color)'} aria-label="modal-layout-title">
						{title}
					</Text>
					<CloseModalButton type="button" id="close-button" onClick={onClose}>
						<MdClose size="24" color="var(--text-color)" />
					</CloseModalButton>
				</Header>
				<Body>{children}</Body>
			</Container>
			<Overlay order={+order.split('-')[1]} data-overlay-order={`overlay-${order.split('-')[1]}`} onClick={onClose} />
		</>
	);
};

const Container = styled.div<{ order: number }>`
	position: absolute;
	top: 50%;
	left: 50%;
	padding: var(--padding-md);
	min-height: 360px;
	width: calc(100dvw - 32px);
	height: calc(100dvh - var(--nav-height));
	border-radius: var(--radius);
	transform: translate(-50%, -50%);
	background-color: var(--bg-color);
	border: 1px solid var(--outline-color);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
	z-index: ${({ order }) => `calc(var(--modal-index) + ${order * 10} + 1)`};

	@media screen and (min-width: 720px) {
		height: calc(100dvh - 2 * var(--nav-height));
		width: 720px;
		padding: 32px;
	}
`;

const Header = styled(Flex)`
	min-height: calc(var(--nav-height) * 0.5);

	div {
		@media screen and (max-width: 640px) {
			font-size: var(--fz-h5);
		}
	}

	@media screen and (min-width: 640px) {
		min-height: var(--nav-height);
	}
`;

const CloseModalButton = styled(Button)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: var(--padding-sm);
	border-radius: var(--radius-extra);
	background-color: var(--outline-color);

	&:hover {
		outline: 1px solid var(--text-color);
		outline-offset: 2px;
	}

	@media screen and (max-width: 640px) {
		padding: calc(var(--padding-sm) * 0.5);
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: calc(100% - var(--nav-height));
	overflow-y: scroll;
	scrollbar-width: none; // Firefox
	&::-webkit-scrollbar {
		display: none; // hide scrollbar
	}
`;

const Overlay = styled.div<{ order: number }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	backdrop-filter: blur(3px);
	background-color: var(--backdrop-blur-bg-color);
	z-index: ${({ order }) => `calc(var(--modal-index) + ${order * 10})`};
	cursor: pointer;
`;

export default ModalLayout;
