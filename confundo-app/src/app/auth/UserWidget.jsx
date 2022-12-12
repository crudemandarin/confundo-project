import { Button } from "primereact/button";

import { useApp } from "../common/stores/app.store";

const UserWidget = () => {
	const { userId, logout } = useApp();

	const onSignOutClick = () => {
		logout();
	};

	if (userId) {
		return (
			<div className="flex align-items-center">
				<div style={{ color: "white" }}>
					Welcome back, <span style={{ fontWeight: "bold" }}>{userId}</span>{" "}
				</div>
				<div className="s-2" />
				<Button
					className="p-button-sm p-button-secondary"
					icon="pi pi-sign-out"
					onClick={onSignOutClick}
				/>
			</div>
		);
	}

	return (
		<div className="flex align-items-center" style={{ color: "white" }}>
			<div>Sign in to get started</div>
		</div>
	);
};

export default UserWidget;
