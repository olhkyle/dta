import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface UserProfileProps {
	name: string;
	isAdmin: boolean;
	isLoading: boolean;
	Loading: () => ReactNode;
	onLogout: () => void;
}

const UserProfile = ({ name, isAdmin, isLoading, Loading, onLogout }: UserProfileProps) => {
	return (
		<Container>
			{isAdmin && (
				<ImgContainer>
					<img src="./profile.png" alt="profile" />
				</ImgContainer>
			)}
			<Name>{name}</Name>
			<button type="button" onClick={onLogout}>
				{isLoading ? <Loading /> : '로그아웃'}
			</button>
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 0.4rem;
	margin-left: 32px;
	padding: var(--btn-sm-padding);
	border-radius: var(--radius);
	background-color: var(--color-green-300);
	cursor: pointer;

	button {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 0.4rem;
		padding: calc(var(--padding-md) * 0.8) calc(var(--padding-md));
		width: 100%;
		color: var(--text-color);
		border: 1px solid var(--color-gray-200);
		border-radius: var(--radius);
		background-color: var(--bg-color);
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.3s ease-in-out 0.15s, visibility 0.3s ease-in-out 0.15s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s,
			-webkit-transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s;

		&:hover {
			border-color: var(--text-color);
			font-weight: var(--fw-semibold);
			transition: all 0.3s ease-in-out 0.15s;
		}
	}

	&:hover button {
		opacity: 1;
		visibility: visible;
	}
`;

const ImgContainer = styled.div`
	display: none;
	justify-content: center;
	align-items: center;
	width: 24px;
	height: 24px;

	img {
		width: 100%;
		height: 100%;
	}

	@media screen and (min-width: 800px) {
		display: inline-flex;
	}
`;

const Name = styled.span`
	font-size: var(--fz-p);
	font-weight: var(--fw-bold);
	color: var(--color-white);

	@media screen and (min-width: 1024px) {
		font-size: var(--fz-h7);
	}
`;

export default UserProfile;
