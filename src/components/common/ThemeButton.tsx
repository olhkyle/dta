import useTheme from '../../hooks/useTheme';
import styled from '@emotion/styled';
import { HiSun, HiMoon } from 'react-icons/hi';

const ThemeButton = () => {
	const [theme, toggleTheme] = useTheme();

	console.log(theme);

	return (
		<Container onClick={toggleTheme}>
			<Switch className="ring-4 ring-blue-primary" />
			<BtnText>
				<BtnTextIcon>
					<HiSun size="20" color="var(--color-dark)" />
				</BtnTextIcon>
				<BtnTextIcon>
					<HiMoon size="20" />
				</BtnTextIcon>
			</BtnText>
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
	background-color: #fff;
	border-radius: 100%;
	transition: left calc(var(--transition-duration) * 1s);
	outline: 2px solid var(--color-green-50);
`;

const BtnText = styled.div`
	display: flex;
	height: 100%;
	background-color: var(--btn-bg-color);
	border-radius: 25px;
	box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.25);
	transition: background-color calc(var(--transition-duration) * 1s);
`;

const BtnTextIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50%;
	text-align: center;
	color: #fff;
`;

export default ThemeButton;
