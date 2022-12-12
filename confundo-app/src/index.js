/* Program Entrypoint */

import React from "react";
import ReactDOM from "react-dom/client";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import "./index.css";
import "./app/common/styles/styles.css";

import App from "./app/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
