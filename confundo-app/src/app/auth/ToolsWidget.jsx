import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

import { useApp } from "../common/stores/app.store";
import LoginDialog from "./LoginDialog";
import UploadDialog from "../uploads/UploadDialog";

const ToolsWidget = () => {
	const { userId, role } = useApp();
	const navigate = useNavigate();

	const [loginVisible, setLoginVisible] = useState(false);
	const [createVisible, setCreateVisible] = useState(false);

	const onDashboardClick = () => {
		navigate("/dashboard");
	};

	const onSignInClick = () => {
		setLoginVisible(true);
	};

	const onCreateClick = () => {
		setCreateVisible(true);
	};

	const dashboardButton = () =>
		role === "admin" ? (
			<Button
				onClick={onDashboardClick}
				label="Dashboard"
				icon="pi pi-user"
				className="p-button-sm p-button-secondary"
			/>
		) : undefined;

	const signInButton = () =>
		!userId ? (
			<Button onClick={onSignInClick} label="Sign In" className="p-button-sm" />
		) : undefined;

	const createButton = () =>
		userId ? (
			<Button
				onClick={onCreateClick}
				label="Create"
				icon="pi pi-plus"
				className="p-button-sm"
			/>
		) : undefined;

	return (
		<>
			<div className="flex sc-1">
				{dashboardButton()}
				{signInButton()}
				{createButton()}
			</div>
			<LoginDialog visible={loginVisible} setVisible={setLoginVisible} />
			<UploadDialog visible={createVisible} setVisible={setCreateVisible} />
		</>
	);
};

export default ToolsWidget;
