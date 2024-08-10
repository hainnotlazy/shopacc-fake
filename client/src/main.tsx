import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Provider } from "react-redux";
import store from "./core/store/store";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<CookiesProvider>
			{/* <Provider store={store}> */}
			<RouterProvider router={router} />
			{/* </Provider> */}
		</CookiesProvider>
	</React.StrictMode>,
);
