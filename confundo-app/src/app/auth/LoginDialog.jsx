import { useEffect, useState } from "react";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import { useApp } from "../common/stores/app.store";

const LoginDialog = ({ visible, setVisible }) => {
	const { login } = useApp();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		setError("");
	}, [username, password]);

	const onHide = () => {
		setVisible(false);
		setUsername("");
		setPassword("");
		setError("");
	};

	const onLoginClick = async () => {
		try {
			await login(username, password);
			onHide();
		} catch (err) {
			console.error("Login failed. Error =", err);
			setError("Username or password may be incorrect");
		}
	};

	const renderError = error ? (
		<>
			<div className="s-3" />
			<div className="p-error">{error}</div>
		</>
	) : undefined;

	const buttonIsDisabled = () => !(username && password);

	return (
		<Dialog
			visible={visible}
			style={{ width: "350px" }}
			onHide={() => onHide()}
		>
			<div className="dialog-title">Log In</div>

			<div className="s-2" />

			<div>Get access to start uploading your own photos for free today</div>

			<div className="s-3" />

			<div className="flex flex-column">
				<span className="p-float-label">
					<InputText
						id="username-input"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						style={{ width: "100%" }}
					/>
					<label htmlFor="username-input">Username</label>
				</span>

				<div className="s-3" />

				<span className="p-float-label">
					<Password
						id="password-input"
						toggleMask
						feedback={false}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						inputStyle={{ width: "100%" }}
						style={{ width: "100%" }}
					/>
					<label htmlFor="password-input">Password</label>
				</span>

				{renderError}

				<div className="s-3" />

				<Button
					label="Login"
					onClick={onLoginClick}
					disabled={buttonIsDisabled()}
				/>

				<div className="s-2" />

				<div className="text-center">
					Don&apos;t have an account?{" "}
					<span style={{ textDecoration: "underline" }}>Sign up now</span>
				</div>
			</div>
		</Dialog>
	);
};

export default LoginDialog;
