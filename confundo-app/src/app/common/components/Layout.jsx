import { NavLink, Outlet } from "react-router-dom";

import { useApp } from "../stores/app.store";
import UserWidget from "../../auth/UserWidget";
import ToolsWidget from "../../auth/ToolsWidget";

const Layout = () => {
	const { userId } = useApp();

	const uploadsLink = userId ? (
		<NavLink to="/uploads">My Uploads</NavLink>
	) : undefined;

	return (
		<>
			<header>
				<div className="header-banner">
					<h1 className="header-title">Confundo Image Storage</h1>
					<UserWidget />
				</div>
				<div className="subheader">
					<nav className="flex">
						<NavLink to="/home">Home</NavLink>
						{uploadsLink}
					</nav>

					<div className="flex-grow" />

					<ToolsWidget />
				</div>
			</header>
			<Outlet />
		</>
	);
};

export default Layout;
