import styled from '@emotion/styled';

interface UserProfileProps {
	name: string;
	onLogout: () => void;
}

const UserProfile = ({ name, onLogout }: UserProfileProps) => {
	return (
		<Container>
			<ImgContainer>
				<img src="./profile.png" alt="profile" />
			</ImgContainer>
			<Name>{name}</Name>
			<button type="button" onClick={onLogout}>
				로그아웃
			</button>
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 0.4rem;
	margin-left: 0.5rem;
	padding: var(--btn-sm-padding);
	border-radius: 9999px;
	background-color: var(--color-green-50);
	cursor: pointer;

	button {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 0.4rem;
		padding: 0.5rem 0.8rem;
		width: 100%;
		color: var(--text-color);
		border: 1px solid var(--color-gray-500);
		border-radius: 8px;
		background-color: var(--bg-color);
		opacity: 0;
		transition: opacity 0.3s ease-in-out 0.15s, visibility 0.3s ease-in-out 0.15s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s,
			-webkit-transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s;
	}

	&:hover button {
		opacity: 1;
	}
`;

const Name = styled.span`
	font-size: 18px;
	font-weight: 700;
	color: var(--color-white);
`;

const ImgContainer = styled.span`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 28px;
	height: 28px;

	img {
		width: 100%;
		height: 100%;
	}
`;

export default UserProfile;
