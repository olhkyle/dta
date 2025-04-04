import styled from '@emotion/styled';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../../hooks';

const ThemeButton = () => {
	const [, toggleTheme] = useTheme();

	return (
		<Container onClick={toggleTheme} aria-label="theme-toggle-button">
			<Switch />
			<BtnEmojis>
				<IconWrapper>
					<HiSun size="20" color="var(--color-dark)" />
				</IconWrapper>
				<IconWrapper>
					<HiMoon size="20" />
				</IconWrapper>
			</BtnEmojis>
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	width: 50px;
	height: 26px;
	cursor: pointer;
`;

const Switch = styled.div`
	position: absolute;
	top: 2px;
	left: var(--position-left);
	width: 22px;
	height: 22px;
	background-color: var(--color-white);
	border-radius: 100%;
	transition: left calc(var(--transition-duration) * 1s);
	outline: 3px solid var(--color-green-50);
`;

const BtnEmojis = styled.div`
	display: flex;
	height: 100%;
	background-color: var(--btn-bg-color);
	border-radius: 25px;
	box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.25);
	transition: background-color calc(var(--transition-duration) * 1s);
`;

const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50%;
	text-align: center;
	color: #fff;
`;

export default ThemeButton;
