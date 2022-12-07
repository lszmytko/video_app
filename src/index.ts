import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/main.css";
import App from "./App";
import { AppContextProvider } from "./context/context";

ReactDOM.render(
	<React.StrictMode>
		<AppContextProvider>
			<App />
		</AppContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);



