import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Main, Nav, ScrollToTopButton, Modal } from '.';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, [pathname]);

	return (
		<>
			<Nav />
			<Main>
				<Outlet />
			</Main>
			<Footer />
			<ScrollToTopButton topPosToShow={300} />
			<StyledToastContainer position="bottom-center" autoClose={1500} closeOnClick={true} pauseOnHover={false} limit={1} />
			<Modal />
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
