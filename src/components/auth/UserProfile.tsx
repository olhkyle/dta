import { ReactNode } from 'react';
import styled from '@emotion/styled';
import profileEmoji from '../../assets/profile.webp';
import { Button, Flex } from '../common';
import { Link } from 'react-router-dom';
import { routes } from '../../constants';

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
				<ImageBlock>
					<img src={profileEmoji} alt="profile emoji" />
				</ImageBlock>
			)}
			<Name>{name}</Name>
			<CustomFlex direction={'column'} aria-haspopup="true">
				<DashboardLink to={routes.DASHBOARD}>대시보드</DashboardLink>
				<LogoutButton type="button" onClick={onLogout}>
					{isLoading ? <Loading aria-label="isLoading" /> : '로그아웃'}
				</LogoutButton>
			</CustomFlex>
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 6px;
	margin-left: 32px;
	padding: var(--padding-sm) var(--padding-md);
	border-radius: var(--radius);
	background-color: var(--color-green-300);
	cursor: pointer;
	transition: all 0.15s ease-in-out;

	&:hover > div[aria-haspopup='true'] {
		opacity: 1;
		visibility: visible;
	}
`;

const CustomFlex = styled(Flex)`
	position: absolute;
	top: 100%;
	left: 0;
	margin-top: 6px;
	padding: calc(var(--padding-sm) * 0.5);
	background-color: var(--bg-color);
	border: 1px solid var(--color-gray-200);
	border-radius: var(--radius);
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.3s ease-in-out 0.15s, visibility 0.3s ease-in-out 0.15s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s,
		-webkit-transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s;
`;

const LogoutButton = styled(Button)`
	padding: calc(var(--padding-md) * 0.8) calc(var(--padding-md));
	width: 100%;
	color: var(--text-color);
	background-color: var(--bg-color);

	&:hover {
		background-color: var(--btn-light-bg-color);
	}
`;

const DashboardLink = styled(Link)`
	padding: calc(var(--padding-md) * 0.8) calc(var(--padding-md));
	width: 100%;
	color: var(--text-color);
	background-color: var(--bg-color);
	font-weight: var(--fw-semibold);
	border-radius: var(--radius);

	&:hover {
		background-color: var(--btn-light-bg-color);
	}
`;

const ImageBlock = styled.div`
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
