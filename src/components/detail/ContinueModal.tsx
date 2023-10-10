import styled from '@emotion/styled';
import { Button, Text } from '..';

interface ContinueModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ContinueModal = ({ isOpen, onClose }: ContinueModalProps) => {
	return (
		<Container>
			<Header>
				<Text typo="h5" color="var(--text-color)">
					정말로 삭제 하시겠습니까?
				</Text>
				<CloseModalButton
					type="button"
					onClick={() => {
						onClose();
					}}>
					X
				</CloseModalButton>
			</Header>
			<Body>
				<ContinueButton type="submit">네</ContinueButton>
				<ConfirmButton type="button">아니오</ConfirmButton>
			</Body>
		</Container>
	);
};

const Container = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	padding: 2rem;
	width: 300px;
	border-radius: 8px;
	transform: translate(-50%, -50%);
	background-color: var(--bg-color);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
	z-index: 9999;

	@media screen and (min-width: 640px) {
		width: 400px;
	}

	@media screen and (min-width: 720px) {
		width: 500px;
	}
`;

const Header = styled.div`
	position: relative;
	margin-top: 1rem;
`;

const CloseModalButton = styled(Button)`
	position: absolute;
	top: -40%;
	right: -10%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	width: 24px;
	height: 24px;
	border-radius: 9999px;
	background-color: var(--outline-color);

	&:hover {
		outline: 1px solid var(--text-color);
	}

	@media screen and (min-width: 640px) {
		right: -7.5%;
	}

	@media screen and (min-width: 720px) {
		top: -60%;
		right: -4.5%;
	}
`;

const Body = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4rem;
	margin: 4rem 0 2rem;
	width: 100%;
`;

const ContinueButton = styled(Button)`
	padding: 0.75rem 1.5rem;
	color: var(--bg-color);
	background-color: var(--color-green-50);

	&:hover {
		background-color: var(--color-green-300);
	}
`;

const ConfirmButton = styled(Button)`
	padding: 0.75rem 1rem;
	color: var(--bg-color);
	background-color: var(--text-color);

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}
`;

export default ContinueModal;
