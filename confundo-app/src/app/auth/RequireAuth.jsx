import { Navigate, useLocation } from "react-router-dom";

import { useApp } from "../common/stores/app.store";

const RequireAuth = ({ children }) => {
	const { userId } = useApp();
	const location = useLocation();

	if (!userId) {
		// Redirect them to the / page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return children;
};

export default RequireAuth;
