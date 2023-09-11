import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Footer, Main, Nav, ScrollToTopButton } from '.';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
	return (
		<>
			<Nav />
			<Main>
				<Outlet />
			</Main>
			<Footer />
			<ScrollToTopButton topPosToShow={300} />
			<StyledToastContainer position="bottom-center" autoClose={1500} closeOnClick={true} pauseOnHover={false} limit={1} />
		</>
	);
};

const StyledToastContainer = styled(ToastContainer)`
	.Toastify__toast {
		color: var(--text-color);
		border-radius: 12px;
		background-color: var(--bg-color);
		border: 1px solid var(--outline-color);
	}
`;

export default Layout;
