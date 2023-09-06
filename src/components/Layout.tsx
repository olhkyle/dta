import { Main, Nav } from '.';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<Nav />
			<Main>
				<Outlet />
			</Main>
		</>
	);
};

export default Layout;
