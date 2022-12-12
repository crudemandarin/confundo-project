import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./common/components/Layout";
import Error404 from "./common/components/Error404";
import RequireAuth from "./auth/RequireAuth";
import HomePage from "./home/HomePage";
import UploadsPage from "./uploads/UploadsPage";
import DashboardPage from "./dashboard/DashboardPage";

const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="*" element={<Error404 />} />
				<Route path="/" element={<HomePage />} />
				<Route path="home" element={<HomePage />} />
				<Route
					path="uploads"
					element={
						<RequireAuth>
							<UploadsPage />
						</RequireAuth>
					}
				/>
				<Route
					path="dashboard"
					element={
						<RequireAuth>
							<DashboardPage />
						</RequireAuth>
					}
				/>
			</Route>
		</Routes>
	</BrowserRouter>
);

export default App;
